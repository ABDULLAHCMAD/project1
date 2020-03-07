import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { SelectField, MenuItem, FlatButton } from 'material-ui';
import { Logout, seekerHomeData } from '../store/action/action';
import Paper from 'material-ui/Paper';
// import { Logout, donorprofile, deletefunction } from '../store/action/action';
import { red100 } from 'material-ui/styles/colors';



const style = {
    height: "auto",
    width: 350,
    margin: 10,
    padding: "10px",
    textAlign: 'center',
    display: 'inline-block',
};

class seekerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldataarray: [],
            filtered: [],
            filter: false,
            value: 'All',
        }
    }


    

    componentWillMount = () => {
        let bloodgroup = localStorage.getItem("bloodgroup")
        this.props.seekerHomeData(bloodgroup)
    }
    componentWillReceiveProps = (props) => {
        if (props.seekerHomeData1) {
            console.log(props.seekerHomeData1);
            this.setState({
                alldataarray: props.seekerHomeData1
            })
        }
    }
    onValueChange = (a, b, value) => {
        this.setState({value});
        let filtered = [];
        if (value === 'All') {
            this.setState({ filtered: this.state.alldataarray, filter: false, value });
        } else {
            if (value === "O-") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "O-" );
            }
            if (value === "O+") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "O+" );
            }
            // || donor.bloodGroup === "A+" || donor.bloodGroup === "B+" || donor.bloodGroup === "AB+"
            if (value === "A+") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "A+" );
            }
            if (value === "A-") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "A-" );
            }
            if (value === "B+") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "B+" );
            }
            if (value === "B-") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "B-"  || donor.bloodGroup === "AB-");
            }
            if (value === "AB+") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "AB+");
            }
            if (value === "AB-") {
                filtered = this.state.alldataarray.filter((donor) => donor.bloodGroup === "AB-" );
            }
            this.setState({ filtered, filter: true });
        }

    };


    // deletebutton1 = () => {
    //     // console.log("delete function")
    //     let uid = localStorage.getItem("uid")
    //     this.props.deletefunction(uid)
    // }

    render() {
        return (
            <div>
                <h1>Welcome to Seeker Home  </h1> 
                <FlatButton variant="contained" color="primary" onClick={() => this.props.Logout()} style={{ "background": "green !important","color": "red" }}>
                    Log Out
                    {/* <Link to='/' }></Link> */}
                </FlatButton>
                <SelectField
                    floatingLabelText="Search Blood Group " style={{ textAlign: '',margin: '0 31%'  }}
                    value={this.state.value}
                    onChange={this.onValueChange}
                >
                    <MenuItem value='All' primaryText="All" />
                    <MenuItem value='O-' primaryText="O-" />
                    <MenuItem value='O+' primaryText="O+" />
                    <MenuItem value='A+' primaryText="A+" />
                    <MenuItem value='A-' primaryText="A-" />
                    <MenuItem value='B+' primaryText="B+" />
                    <MenuItem value='B-' primaryText="B-" />
                    <MenuItem value='AB-' primaryText="AB-" />
                    <MenuItem value='AB+' primaryText="AB+" />
                </SelectField>

                <div className="divClass">
                    {
                        this.props.seekerHomeData1 && !this.state.filter ?
                            this.props.seekerHomeData1.map((value, index) => {
                                return <Paper style={{ "display": "block !important" }} key={index} style={style} zDepth={5}>
                                    <div className="seekerMainDiv">
                                        <li>{value.username}</li>
                                        <li>{value.bloodGroup}</li>
                                        <li>{value.number}</li>
                                        <li>{value.category}</li>
                                        {/* <button onClick={this.deletebutton1}>Delete</button> */}
                                        {/* <button onClick={this.props.Logout}>Log Out</button> */}
                                        <br />
                                    </div>
                                </Paper>
                            })
                            : null
                    }
                    {
                        this.state.filtered ? this.state.filtered.map((value, index) => {
                            return <Paper style={{ "display": "block !important" }} key={index} style={style} zDepth={5} >
                                <div className="seekerMainDiv">
                                    <li>{value.username}</li>
                                    <li>{value.bloodGroup}</li>
                                    <li>{value.number}</li>
                                    <li>{value.category}</li>
                                    <br />
                                </div>
                            </Paper>
                        }) : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    // console.log(state.root.seekerHomeData)
    return ({
        seekerHomeData1: state.root.seekerHomeData,
        bloodgroup: state.root.bloodgroup
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        
        Logout: () => { dispatch(Logout()) },
        // donorprofile: (uid) => { dispatch(donorprofile(uid)) },
        // deletefunction: (uid) => { dispatch(deletefunction(uid)) },
        seekerHomeData: (bloodgroup) => { dispatch(seekerHomeData(bloodgroup)) }
       
    })
}

// function mapDispatchToProp(dispatch) {
//     return ({
//         Logout: () => { dispatch(Logout()) },
//         donorprofile: (uid) => { dispatch(donorprofile(uid)) },
//         deletefunction: (uid) => { dispatch(deletefunction(uid)) }
//     })
// }


export default connect(mapStateToProp, mapDispatchToProp)(seekerHome);


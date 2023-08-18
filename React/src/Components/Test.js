    import React, { Component } from 'react'
import FileSaver from 'file-saver'

export default class Test extends Component {
    constructor(props){
        super(props)
        this.state = { 
            imageF:'',
            Data:'',
            isLoaded:false,
            tab:false,
        }
    }
    
    handleChange = (e) =>{
        this.setState({
            imageF:URL.createObjectURL(e.target.files[0]),
            Data:'',
            isLoaded:false,
            tab:false,
        })
        console.log(this.state.imageF)
    }

    handleSubmit = () =>{
        FileSaver.saveAs(this.state.imageF,"image.png")
    }
    
    handleRequest = ()=>{
        this.setState({
            tab:true,
        })
        fetch("http://localhost:5000/single")
        .then((response) => response.json())
        .then(
            (data) => {
            this.setState({
                Data : data.result,
                isLoaded : true,
            })},
            (error) => {
                console.log(error)
            }
        );
        console.log(this.state.Data)
    }
        
  render() {
    return (
      <div className='Diagnose' id='Diagnose'>
        <h2>Diagnosis</h2>
        <div className='LineTitle'></div>
        <h1>Get started with your Diabetic Retinopathy Diagnosis</h1>
        <div className='DiagnoseBox'>
            <div className='DB1'>
                {this.state.imageF === '' ? <></> : 
                <div className='DB1-Image'>
                    <img src={this.state.imageF} alt='preview' width='200px'></img>
                    {/* <li>{this.state.imageF}</li> */}
                </div>}
                <div className='DB1-Buttons'>
                    <input type="file" name='files' onChange={(e)=>this.handleChange(e)}></input>
                    <button onClick={()=>this.handleSubmit()}>Save</button>
                </div>
            </div>
            <div className='DB2'>
                {this.state.tab ? 
                <div className='DB2-Result'>
                    {this.state.isLoaded ? <h3>Result : {this.state.Data}</h3> : <h3 className='Loading'>Loading....</h3>}
                </div> : <></>}
                <div className='DB2-Button'>
                    <button onClick={()=>this.handleRequest()}>Submit</button>
                </div>
            </div>
            <div className='DB3'>
                <div className='DB3-Info'>
                    <span>Stages of Diabetic Retinopathy</span>
                    <ul>
                        <li><p>No DR : No Diabetic Retinopathy is found.</p></li>
                        <li><p>Mild DR : Initial stage, the patient must become 
                            educated on the possible ramifications of diabetes, 
                            while taking steps to better control their blood sugar 
                            and diet and decrease the risk of diabetic retinopathy 
                            progression and vision loss.</p></li>
                        <li><p>Moderate DR : Leakage of blood and fluid into the 
                            retina tissue. This fluid can cause a loss of vision. 
                            Referral to a specialist for further evaluation and possible 
                            treatment may be appropriate and recommended.</p></li>
                        <li><p>Severe DR : A timely referral to an eye specialist 
                            is nearly always appropriate. The good news is that often, 
                            some, if not all, of the lost vision can be improved with appropriate treatment.</p></li>
                        <li><p>Proliferative DR : Final stage, the disease has advanced 
                            significantly and is very threatening to one's vision.Patients require immediate 
                            referral to a retina specialist for further examination and treatment.</p></li>

                    </ul>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

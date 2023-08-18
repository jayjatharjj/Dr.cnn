import React, { Component } from 'react'

export default class Test2 extends Component {
  constructor(props){
    super(props)
    this.state = { 
        Data1:'',
        Data2:'',
        Data3:'',
        Data4:'',
        Data5:'',
        Data6:'',
        tab:false,
        isLoaded:false,
    }
}
    handleSubmit = () => {
      this.setState({
        tab:true,
      })
        fetch("http://localhost:5000/all")
        .then((response) => response.json())
        .then(
            (data) => {
            this.setState({
                Data1 : data.acc,
                Data2 : data.c1,
                Data3 : data.c2,
                Data4 : data.c3,
                Data5 : data.c4,
                Data6 : data.c5,
                isLoaded:true,
            })},
            (error) => {
                console.log(error)
            }
        );
        console.log(this.state.Data1)
        console.log(this.state.Data2)
        console.log(this.state.Data3)
        console.log(this.state.Data4)
        console.log(this.state.Data5)
        console.log(this.state.Data6)
    }
  render() {
    return (
      <div className='ModelInfo' id='ModelInfo'>
        <h2>Model Information</h2>
        <div className='LineTitle'></div>
        <div className='Description'>
          <p>Diabetic Retinopathy (DR) is caused as a result of 
            Diabetes Mellitus which causes development of various 
            retinal abrasions in the human retina. These lesions cause 
            hindrance in vision and in severe cases, DR can lead to blindness. 
            DR is observed amongst 80% of patients who have been diagnosed from 
            prolonged diabetes for a period of 10-15 years.
            <br></br>Our suggested CNN obtains a specificity of 94% on the training 
            dataset of 14,650 pictures and an accuracy of 69% on the 3,660 validation images.
            <br></br>Because there is not enough data, it is enhanced to make the dataset larger. 
            The data is split into two sets: the training set has 2,930 photos, while the validation 
            set contains 732 images.
            <br></br>The original pre-processed photos are insufficient to sufficiently train the model. 
            All of the photographs are enhanced using techniques including rotation, magnification, 
            horizontal flip, vertical flip, blurring, brightness, and saturation in order to maximise the 
            number of images. Using the ImageDataGenerator in the Keras Preprocessing Library, all parameter 
            values were created at random and then applied.The final dataset includes 3,660 pictures for the 
            validation dataset and 14,650 images for the training dataset.
            <br></br>A confusion matrix is a table that is used 
            to define the performance of a classification algorithm. 
            A confusion matrix visualizes and summarizes the performance 
            of a classification algorithm.</p>
        </div>
        <div className='MInfoSection'>
          <div className='MInfo-Button'>
            <button onClick={()=>this.handleSubmit()}>Generate Confusion Matrix</button>
          </div>
          {this.state.tab ? <div className='ConfusionMatrix'>
            {this.state.isLoaded ? <div>
              <div className='CM1'>
                <h1>Accuracy : </h1>
                <h2>{this.state.Data1} %</h2>
              </div>
              <div className='CM2'>
                <h1>Confusion Matrix :</h1>
                <h2>{this.state.Data2}
                  <br></br>{this.state.Data3}
                  <br></br>{this.state.Data4}
                  <br></br>{this.state.Data5}
                  <br></br>{this.state.Data6}</h2>
              </div>
            </div> : <div>
              <div className='Loading'> 
                <h1>Loading....</h1>
              </div>
            </div>}
            </div>:<></>}
        </div>
      </div>
    )
  }
}

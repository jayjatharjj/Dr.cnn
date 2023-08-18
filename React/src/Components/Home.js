import React, { Component } from 'react'
import './HomeCSS.css'
import Image1 from '../Images/IntroImage.png'
import Image2 from '../Images/Retina.jpg'
import Test from './Test'
import Test2 from './Test2'
import Circle1 from '../Images/circle1.png'
import Circle2 from '../Images/circle2.png'
import Circle3 from '../Images/circle3.png'
import Circle4 from '../Images/circle4.png'

export default class Home extends Component {
  render() {
    return (
    <React.Fragment>
        <div className='LandingPage'>
            <div className='LandingPageFlexbox'>
                <div className='IntroText'>
                    <div className='Welcome'>
                        <span>WELCOME to</span>
                        <h2>DR. CNN</h2>
                    </div>
                    <span className='FullForm'><h3>D</h3>iabetic <h3>R</h3>etinopathy <span className='Using'>using</span> <span className='Network'><h3>C</h3>onvolutional<h3>N</h3>eural<h3>N</h3>etwork</span></span>
                </div>
                <div className='IntroImage'>
                    <img src={Image1} alt='Intro' width='100%'></img>
                </div>
            </div>
        </div>

        <div className='Title' id='ActivitySection'>
            <h2>Our Activity</h2>
            <div className='LineTitle'></div>
            <h1>Meet the Best Retinopathy Diagnosis</h1>
            <p>Retinopathy is most focused in helping you discover your vison.</p>
            <p>Overcame the hurdle and problem caused by Diabetes.</p>
            <div className='CardFlexbox'>
                <div className='Card'>
                    <div className='CardImage'><img src={Circle1} alt='icon' width='40px'></img></div>
                    <h3>Upload Image</h3>
                    <div className='line-Align'><div className='line'></div></div>
                    <div className='CardP'><p>Select image and upload it.</p></div>
                </div>
                <div className='Card'>
                    <div className='CardImage'><img src={Circle2} alt='icon' width='40px'></img></div>
                    <h3>Run Diagnosis</h3>
                    <div className='line-Align'><div className='line'></div></div>
                    <div className='CardP'><p>Run diagnosis.</p></div>
                </div>
                <div className='Card'>
                    <div className='CardImage'><img src={Circle3} alt='icon' width='40px'></img></div>
                    <h3>Result</h3>
                    <div className='line-Align'><div className='line'></div></div>
                    <div className='CardP'><p>Check the results</p></div>
                </div>
                <div className='Card'>
                    <div className='CardImage'><img src={Circle4} alt='icon' width='40px'></img></div>
                    <h3>Care</h3>
                    <div className='line-Align'><div className='line'></div></div>
                    <div className='CardP'><p>Take care accordingly.</p></div>
                </div>
            </div>
        </div>

        <div className='AboutSection' id='AboutSection'>
            <h2>About</h2>
            <div className='LineTitle'></div>
            <div className='AboutP'>
                <p><img src={Image2} alt='Retina' width='300px'></img>Diabetic Retinopathy turns out to be a major cause of blindness in the world,
                Diabetic Retinopathy (DR) is caused by Diabetes Mellitus which causes development of various retinal abrasions in the human retina.
                These lesions cause hindrance in vision and in severe cases, DR can lead to blindness.
                Diabetic Retinopathy using Convolutional Neural Network helps us to identify and discover whether the patient have Diabetic Retinopathy.
                Deep architectures of CNN have been instrumental in providing the finesse and high performance to trained models by learning patterns from raw images,
                Our suggested CNN obtains a specificity of 94% on the training dataset of 14,650 pictures and an accuracy of 69% on the 3,660 validation images.</p>
            </div>
        </div>
        <Test/>
        <Test2/>
    </React.Fragment>
    )
  }
}

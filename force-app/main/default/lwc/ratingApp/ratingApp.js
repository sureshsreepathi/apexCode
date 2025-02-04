import { LightningElement, track } from 'lwc';
import Avatar from '@salesforce/resourceUrl/Avatar';
export default class ReviewsComponent extends LightningElement {
    
   image =  Avatar;
    @track reviews = [
        {
            id: '1',
            name: 'Charolette Hanlin',
            title: 'Product Designer, InnovateX',
            comment: 'A game-changer UI Kit for UX/UI designers. Union UI is a must-try.',
            avatar : this.image,
            className: 'slds-media slds-media_center new'
        },
        {
            id: '2',
            name: 'Eleanor Pena',
            title: 'Product Designer, Apex',
            comment: "I've gained so much knowledge using Union UI, and now I recommend it to all the Junior Designers I mentor.",
            avatar: this.image,
            className: 'slds-media slds-media_center'
        },
        {
            id: '3',
            name: 'Guy Hawkins',
            title: 'Founder, Quantum Creations',
            comment: "Loving Union UI! It's been perfect for my ongoing project, covering every component required for the design.",
            avatar: this.image,
            className: 'slds-media slds-media_center'
        },
        {
            id: '4',
            name: 'Kristin Watson',
            title: 'UI/UX Designer, Nexus Tech',
            comment: 'Union UI is the best design system on Figma. Excited to dive into it again.',
            avatar: this.image,
            className: 'slds-media slds-media_center newcss'
        },
        {
            id: '5',
            name: 'Jane Cooper',
            title: 'Co-Founder, Elevate',
            comment: 'A key asset in my design journey, Union UI has streamlined defining elements and layouts in my projects.',
            avatar: this.image,
            className: 'slds-media slds-media_center'
        },
        {
            id: '6',
            name: 'Leslie Alexander',
            title: 'UI Designer, Fusion Dynamics',
            comment: 'Using Union UI has greatly improved my efficiency. It provides everything necessary for rapid iteration.',
            avatar: this.image,
            className: 'slds-media slds-media_center'
        }
    ];
}


// import { LightningElement,track } from 'lwc';

// export default class RatingApp extends LightningElement {

//     @track dataAccess=[
//         {
//             id:'hanline',
//             description: 'A game changer',
//             className: 'new-card'

//         },
//         {
//             id:'pena',
//             description: 'I have gaved',
//             className: 'new-card'
//         },
//         {
//             id:'hawkins',
//             description: 'Loving union',
//             className: 'new-card'
//         },
//         {
//             id:'watson',
//             description: 'Union Ui',
//             className: 'new-card'
//         },
//         {
//             id:'cooper',
//             description: 'A key asset',
//             className: 'new-card'
//         },
//         {
//             id:'alexander',
//             description: 'Using Union',
//             className: 'new-card'
//         }
//     ]
// }
import { LightningElement } from 'lwc';
export default class Design extends LightningElement {
        handleMouseOver(event) {
            const box = event.currentTarget;
            box.style.transform = 'rotateY(10deg)';
            box.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            box.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        }
    
        handleMouseOut(event) {
            const box = event.currentTarget;
            box.style.transform = 'none';
            box.style.boxShadow = 'none';
        }
    }
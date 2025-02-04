import { LightningElement, api, wire } from 'lwc';
import oppMethod from '@salesforce/apex/fetchOpportunityRecords.opportunityRecords';
import updateOpportunityStages from '@salesforce/apex/fetchOpportunityRecords.updateStageValue';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class OpportunityList extends NavigationMixin(LightningElement) {

 
    @api recordId; // Account ID passed to the component
    opportunities = [];
    error;
    selectedOpportunities = new Set(); // To store selected opportunities
    showModal = false; // Controls the stage selection modal visibility
    showConfirmationModal = false; // Controls the confirmation modal visibility
    selectedStage = ''; // Stores the stage selected in the modal
    stageOptions = [];
    wiredOpportunitiesResult;
 
    // @wire(oppMethod)
    // wiredStageOptions({ error, data }) {
    //     if (data) {
    //         this.stageOptions = data.map(stage => ({
    //             label: stage,
    //             value: stage
    //         }));
    //     } else if (error) {
    //         console.error('Error loading stage options:', error);
    //     }
    // }
 
    @wire(oppMethod, { accId: this.recordId})
    wiredOpportunities(result) {
        this.wiredOpportunitiesResult = result;
        if (result.data) {
            this.opportunities = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.opportunities = [];
        }
    }
 
    handleOpportunityClick(event) {
        const opportunityId = event.currentTarget.dataset.id;
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: opportunityId,
                actionName: 'view',
            },
        }).then((url) => {
            window.open(url, '_blank');
        });
    }
 
    handleCheckboxChange(event) {
        const opportunityId = event.target.dataset.id;
        if (event.target.checked) {
            this.selectedOpportunities.add(opportunityId);
        } else {
            this.selectedOpportunities.delete(opportunityId);
        }
    }
 
    handleUpdateStage() {
        if (this.selectedOpportunities.size === 0) {
            this.showToast('No Records Selected', 'Please select at least one opportunity to update.', 'warning');
        } else {
            this.showModal = true; // Open the stage selection modal
        }
    }
 
    closeModal() {
        this.showModal = false;
        this.selectedStage = ''; // Reset the selected stage
    }
 
    closeConfirmationModal() {
        this.showConfirmationModal = false;
    }
    handleStageChange(event) {
        this.selectedStage = event.detail.value;
    }
 
    confirmStageUpdate() {
        if (!this.selectedStage) {
            this.showToast('No Stage Selected', 'Please select a stage to apply.', 'warning');
            return;
        }
   
        // if (this.selectedOpportunities.size === 0) {
        //     this.showToast('No Records Selected', 'Please select at least one opportunity to update.', 'warning');
        //     return;
        // }
   
        this.showModal = false;
        this.showConfirmationModal = true; // Open the confirmation modal
    }
 
    applyStageUpdate() {
        const selectedOpportunityIds = Array.from(this.selectedOpportunities);
   
        updateOpportunityStages({
            opportunityIds: selectedOpportunityIds,
            newStage: this.selectedStage,
        })
            .then(() => {
                this.showToast('Success', 'Opportunities updated successfully.', 'success');
                this.showConfirmationModal = false; // Close the confirmation modal
                this.selectedOpportunities.clear(); // Clear selected opportunities
                this.selectedStage = ''; // Reset the selected stage
                this.uncheckAllCheckboxes();
                return refreshApex(this.wiredOpportunitiesResult); // Refresh opportunities
            })
            .catch((error) => {
                console.error('Error:', error);
                this.showToast('Error', 'Failed to update opportunities.', 'error');
            });
    }
 
    uncheckAllCheckboxes() {
        const checkboxes = this.template.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
 
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}

//{

    //     @api recordId; // Account ID passed to the component
    //     opportunities = [];
    //     error;
    //     selectedOpportunities = new Set(); // To store selected opportunities
    //     showModal = false; // Controls modal visibility
    //     stageOptions = [
    //         { label: 'Prospecting', value: 'Prospecting' },
    //         { label: 'Qualification', value: 'Qualification' },
    //         { label: 'Needs Analysis', value: 'Needs Analysis' },
    //         { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
    //         { label: 'Negotiation/Review', value: 'Negotiation/Review' },
    //         { label: 'Closed Won', value: 'Closed Won' },
    //         { label: 'Closed Lost', value: 'Closed Lost' },
    //     ];
    //     selectedStage = ''; // Stores the stage selected in the modal
    //     wiredOpportunitiesResult;
     
    //     // @wire(oppMethod, { accountId: '$recordId' })
    //     // wiredOpportunities(result) {
    //     //     this.wiredOpportunitiesResult = result;
    //     //     if (result.data) {
    //     //         this.opportunities = result.data;
    //     //         this.error = undefined;
    //     //     } else if (result.error) {
    //     //         this.error = result.error;
    //     //         this.opportunities = [];
    //     //     }
    //     // }
    //     connectedCallback(){
    //                 this.getOppRecords();
    //             }
            
    //             getOppRecords(){
    //                 this.isLoading = true;
    //                 console.log('Fetching opportunities for Account ID:', this.recordId);
    //             oppMethod({accId : this.recordId})
    //             .then((result) =>{
    //                 console.log('Fetched Opportunities:', result);
    //                 this.opportunities = result;
    //                 this.error = null;
    //             })
    //             .catch((error) =>{
    //                 console.error('Error fetching opportunities:', error);
    //                 this.error = error;
    //                 this.opportunities = [];
    //             })
    //             .finally(()=>{
    //                 this.isLoading = false;
    //             });
    //         }
     
    //     handleOpportunityClick(event) {
    //         const opportunityId = event.currentTarget.dataset.id;
    //         this[NavigationMixin.GenerateUrl]( {
    //             type: 'standard__recordPage',
    //             attributes: {
    //                 recordId: opportunityId,
    //                 actionName: 'view',
    //             },
    //         }).then((url) => {
    //             // Open the record in a new tab
    //             window.open(url, '_blank');
    //         });
    //     }
     
    //     handleCheckboxChange(event) {
    //         const opportunityId = event.target.dataset.id;
    //         if (event.target.checked) {
    //             this.selectedOpportunities.add(opportunityId);
    //         } else {
    //             this.selectedOpportunities.delete(opportunityId);
    //         }
    //     }
     
    //     handleUpdateStage() {
    //         if (this.selectedOpportunities.size === 0) {
    //             this.showToast('No Records Selected', 'Please select at least one opportunity to update.', 'warning');
    //         } else {
    //             this.showModal = true;
    //         }
    //     }
     
    //     closeModal() {
    //         this.showModal = false;
    //     }
     
    //     handleStageChange(event) {
    //         this.selectedStage = event.detail.value;
    //     }
     
    //     applyStageUpdate() {
    //         if (!this.selectedStage) {
    //             this.showToast('No Stage Selected', 'Please select a stage to apply.', 'warning');
    //             return;
    //         }
       
    //         const selectedOpportunityIds = Array.from(this.selectedOpportunities);
       
    //         if (selectedOpportunityIds.length === 0) {
    //             this.showToast('No Records Selected', 'Please select at least one opportunity to update.', 'warning');
    //             return;
    //         }
       
    //         // Confirmation dialog
    //         const confirmation = window.confirm(
    //             `Are you sure you want to change the stage for ${selectedOpportunityIds.length} opportunities to "${this.selectedStage}"?`
    //         );
       
    //         if (!confirmation) {
    //             // Exit the function if the user cancels the operation
    //             return;
    //         }
       
    //         console.log('Selected Opportunities:', selectedOpportunityIds);
    //         console.log('Selected Stage:', this.selectedStage);
       
    //         updateOpportunityStages({
    //             opportunityIds: selectedOpportunityIds,
    //             newStage: this.selectedStage,
    //         })
    //             .then(() => {
    //                 this.showToast('Success', 'Opportunities updated successfully.', 'success');
    //                 this.showModal = false;
    //                 // Refresh the list of opportunities after the update
    //                 return refreshApex(this.wiredOpportunitiesResult);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //                 this.showToast('Error', 'Failed to update opportunities.', 'error');
    //             });
    //     }
     
    //     showToast(title, message, variant) {
    //         this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    //     }
    // }



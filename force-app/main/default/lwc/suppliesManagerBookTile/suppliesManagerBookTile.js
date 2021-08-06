import { LightningElement, api, wire } from 'lwc';
import showDetails from "@salesforce/messageChannel/showDetails__c";
import { publish, MessageContext } from 'lightning/messageService';

export default class SuppliesManagerBookTile extends LightningElement {
    @api bookDetails;

    @wire(MessageContext) messageContext;

    get priceAfterDiscount(){
        if(this.bookDetails.Discount__c && this.bookDetails.Discount__c > 0){
            return this.bookDetails.Price__c - this.bookDetails.Discount__c;
        } else {
            return undefined;
        }
    }

    handleShowDetailsButtonClick(event){
        event.preventDefault();
        const bookId = this.bookDetails.Id;

        const messagePayload = {
            bookId: bookId,
        }

        publish(this.messageContext, showDetails, messagePayload);
    }
}
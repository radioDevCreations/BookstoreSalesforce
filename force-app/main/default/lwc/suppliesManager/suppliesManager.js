import { LightningElement, track, wire } from 'lwc';
import getAllBooks from '@salesforce/apex/browseBooksPanelController.getAllBooks';

export default class SuppliesManager extends LightningElement {

    @track selectedCategoryId = '';
    @track searchedKeyword = '';

    allBooks;

    @wire(getAllBooks, {selectedCategoryId: '$selectedCategoryId'})
    wirdeBooks({data, error}){
        if(data){
            this.allBooks = []
            data.forEach(item => {
                const book = {};
                book.Id = item.Id;
                book.Name = item.Name;
                book.Author_Name = item.Author__r.Name;
                book.Category__c = item.Category__c;
                book.Price__c = item.Price__c;
                book.ISBN__c = item.ISBN__c;
                book.Quantity__c = item.Quantity__c;
                book.PictureURL__c = item.PictureURL__c;
                book.Discount__c = item.Discount__c;
                this.allBooks.push(book);
            });
            console.log(this.allBooks);
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    };

    handleSelectBookCategory(event){
        this.selectedCategoryId = event.detail;
    }
    
    handleSearchByKeywordChange(event){
        this.searchedKeyword = event.detail;
    }

    get filteredBooks(){
        if(this.searchedKeyword.length){
            return this.allBooks.filter(book => {
                return book.Name.toLowerCase().includes(this.searchedKeyword.toLowerCase()) 
                || book.Author_Name.toLowerCase().includes(this.searchedKeyword.toLowerCase())
                || book.ISBN__c.toLowerCase().includes(this.searchedKeyword.toLowerCase());
            });
        } else {
            return this.allBooks;
        }
    }
} 
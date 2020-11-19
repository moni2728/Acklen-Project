describe('Pruebas', () => {
    beforeEach(function(){
        cy.visit('/');
    })
    it('prueba primera', ()=>{

        cy.get('.PageTitle').should('be.visible');
        cy.get('.BodyCopy').contains('Choose a Parking Lot').should('exist');
        cy.get('#ParkingLot').contains('Valet Parking').should('exist');
        cy.get('.BodyCopy').contains('Please input entry date and time').should('exist');
        cy.get('.BodyCopy').contains('Please input leaving date and time').should('exist');
        cy.get('.SubHead').contains('estimated Parking costs').should('be.visible');
        cy.get('[name="Submit"]').should('be.visible');
        cy.get('.SubHead').contains('Parking Rates').should('be.visible');
        cy.get('p').contains('Valet Parking').should('be.visible');
        cy.get('p').contains('$18 per day').should('be.visible');
        cy.get('p').contains('$12 for five hours or less').should('be.visible');
        cy.get('i').contains('A Lost Ticket Fee of $10.00 will be assessed when the original parking stub cannot be produced when exiting the parking facilities (does not apply to Valet Parking).').should('be.visible');
        
        cy.get('[value="AM"]').should('be.checked')






        
        //cy.get('[name="StartingDate"]').clear().type('10/10/2020');
        //cy.get('[name="StartingTime"]').clear().type('08:00');
        //cy.get('[name="StartingTimeAMPM"]').check();
        
        //cy.get('#ParkingLot').select('Economy Parking');
        


        
    })
})


describe('Website elements validation', () => {
   
    it('Validate items', ()=>{
        cy.visit('/');
        //Valida que el titulo de la página este visible
        cy.get('.PageTitle').should('be.visible');
        //Valida que exista el texto correcto
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
        //valida que los radio botones AM esten en estado checked
        cy.get('[value="AM"]').should('be.checked');

    })
    //valida cómo se veria en distintas viewport el sitio web
    it('Validate viewport iphone-x', ()=>{

        cy.viewport('iphone-x')
        cy.visit('/')
        cy.wait(3000)

    })

    it('Validate viewport ipad Mini', ()=>{

        cy.viewport('ipad-mini')
        cy.visit('/')
        cy.wait(3000)

    })


})


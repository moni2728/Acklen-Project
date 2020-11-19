describe('Pruebas', () => {
    beforeEach(function(){
        cy.visit('/');
    })
    it('Validando Valet Parking', ()=>{
        cy.get('#ParkingLot').select('Valet Parking');
        cy.get('[name="StartingDate"]').clear().type('11/19/2020');
        cy.get('[name="StartingTime"]').clear().type('08:00');
        cy.get('[name="StartingTimeAMPM"]').check();
        cy.get('[name="LeavingDate"]').clear().type('11/19/2020');
        cy.get('[name="LeavingTime"]').clear().type('09:00');
        cy.get('[name="LeavingTimeAMPM"]').check();
        cy.get('[name="Submit"]').click();
        
       
    
        
    })
})


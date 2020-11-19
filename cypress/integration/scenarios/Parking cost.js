
describe('Validation of parking costs', () => {
    beforeEach(function(){
        cy.visit('/');
    })

      // Valida que muestra mensaje de error cuando el usuario no ingreso ningún dato
    it('User doesnt enter any data', ()=>{
        cy.get('[name="Submit"]').click();
        cy.get('table b').should(($anyd) => {
            expect($anyd.text()).to.include('ERROR! Enter A Correctly Formatted Date')
          })
    })
      //Valida que muestre el error cuando el usuario ingreso en fecha de ingreso una fecha mayor a la fecha de salida
    it('User enters wrong date', ()=>{
      cy.get('#ParkingLot').select('Valet Parking');
      cy.get('[name="StartingDate"]').clear().type('11/19/2020');
      cy.get('[name="StartingTime"]').clear().type('12:00');
      cy.get('[name="StartingTimeAMPM"]').check();
      cy.get('[name="LeavingDate"]').clear().type('11/18/2020');
      cy.get('[name="LeavingTime"]').clear().type('12:00');
      cy.get('[name="LeavingTimeAMPM"]').check();
      cy.get('[name="Submit"]').click();
      cy.get('b').should(($cost1) => {
          expect($cost1.text()).to.eq('ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time')
        })
    })

      //Valida el costo de un día
    it('Validate Valet Parking', ()=>{
        cy.get('#ParkingLot').select('Valet Parking');
        cy.get('[name="StartingDate"]').clear().type('11/18/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="StartingTimeAMPM"]').check();
        cy.get('[name="LeavingDate"]').clear().type('11/19/2020');
        cy.get('[name="LeavingTime"]').clear().type('12:00');
        cy.get('[name="LeavingTimeAMPM"]').check();
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost1) => {
            expect($cost1.text()).to.eq('$ 18.00')
          })
        cy.get('.BodyCopy > b').should(($cost3) => {
            expect($cost3.text()).to.include('(1 Days, 0 Hours, 0 Minutes)')
          })
      // valida el costo por hora
        cy.get('#ParkingLot').select('Valet Parking');
        cy.get('[name="StartingDate"]').clear().type('11/20/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="StartingTimeAMPM"]').check();
        cy.get('[name="LeavingDate"]').clear().type('11/20/2020');
        cy.get('[name="LeavingTime"]').clear().type('16:00');
        cy.get('[name="LeavingTimeAMPM"]').check();
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost1) => {
            expect($cost1.text()).to.eq('$ 18.00')
           })
        cy.get('.BodyCopy > b').should(($cost3) => {
            expect($cost3.text()).to.include('(0 Days, 16 Hours, 0 Minutes)')
            })
      })

      // valida el costo por hora en short parking
      it('Validate Short Term Parking', ()=>{
        cy.get('#ParkingLot').select('Short-Term Parking');
        cy.get('[name="StartingDate"]').clear().type('11/20/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="StartingTimeAMPM"]').check();
        cy.get('[name="LeavingDate"]').clear().type('11/20/2020');
        cy.get('[name="LeavingTime"]').clear().type('02:00');
        cy.get('[name="LeavingTimeAMPM"]').check();
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost2) => {
            expect($cost2.text()).to.eq('$ 4.00')
          })
        cy.get('.BodyCopy > b').should(($cost3) => {
            expect($cost3.text()).to.include('(0 Days, 2 Hours, 0 Minutes)')
          })
      //valida el máximo costo de un día de parqueo
        cy.get('#ParkingLot').select('Short-Term Parking');
        cy.get('[name="StartingDate"]').clear().type('11/20/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="LeavingDate"]').clear().type('11/20/2020');
        cy.get('[name="LeavingTime"]').clear().type('11:59');
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost2) => {
            expect($cost2.text()).to.eq('$ 24.00')
          })
        cy.get('.BodyCopy > b').should(($cost3) => {
            expect($cost3.text()).to.include('(0 Days, 11 Hours, 59 Minutes)')
          })

        })

    //valida el costo en horas del long parking
      it('Validate Long Term Garage Parking', ()=>{
        cy.get('#ParkingLot').select('Long-Term Garage Parking');
        cy.get('[name="StartingDate"]').clear().type('11/20/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="StartingTimeAMPM"]').check();
        cy.get('[name="LeavingDate"]').clear().type('11/20/2020');
        cy.get('[name="LeavingTime"]').clear().type('06:00');
        cy.get('[name="LeavingTimeAMPM"]').check();
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost2) => {
              expect($cost2.text()).to.eq('$ 12.00')
              })
        cy.get('.BodyCopy > b').should(($cost3) => {
              expect($cost3.text()).to.include('(0 Days, 6 Hours, 0 Minutes)')
              })
    // valida el costo de parqueo de una semana
        cy.get('#ParkingLot').select('Long-Term Garage Parking');
        cy.get('[name="StartingDate"]').clear().type('11/19/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="LeavingDate"]').clear().type('11/26/2020');
        cy.get('[name="LeavingTime"]').clear().type('12:00');
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost2) => {
              expect($cost2.text()).to.eq('$ 72.00')
              })
        cy.get('.BodyCopy > b').should(($cost3) => {
              expect($cost3.text()).to.include('(7 Days, 0 Hours, 0 Minutes)')
              })
    })

    //valida el costo en horas de long surface parking
    it('Validate Long Term Surface Parking', ()=>{
       cy.get('#ParkingLot').select('Long-Term Surface Parking');
       cy.get('[name="StartingDate"]').clear().type('11/19/2020');
       cy.get('[name="StartingTime"]').clear().type('12:00');
       cy.get('[name="StartingTimeAMPM"]').check();
       cy.get('[name="LeavingDate"]').clear().type('11/19/2020');
       cy.get('[name="LeavingTime"]').clear().type('4:00');
       cy.get('[name="LeavingTimeAMPM"]').check();
       cy.get('[name="Submit"]').click();
       cy.get('.SubHead > b').should(($cost2) => {
          expect($cost2.text()).to.eq('$ 8.00')
          })
       cy.get('.BodyCopy > b').should(($cost3) => {
          expect($cost3.text()).to.include('(0 Days, 4 Hours, 0 Minutes)')
          })
      //valida el costo semanal
        cy.get('#ParkingLot').select('Long-Term Surface Parking');
        cy.get('[name="StartingDate"]').clear().type('11/19/2020');
        cy.get('[name="StartingTime"]').clear().type('12:00');
        cy.get('[name="LeavingDate"]').clear().type('11/26/2020');
        cy.get('[name="LeavingTime"]').clear().type('12:00');
        cy.get('[name="Submit"]').click();
        cy.get('.SubHead > b').should(($cost2) => {
          expect($cost2.text()).to.eq('$ 60.00')
          })
        cy.get('.BodyCopy > b').should(($cost3) => {
          expect($cost3.text()).to.include('(7 Days, 0 Hours, 0 Minutes)')
          })

        })

    // valida el costo en horas del economy parking
    it('Validate Economy Lot Parking', ()=>{
         cy.get('#ParkingLot').select('Economy Parking');
         cy.get('[name="StartingDate"]').clear().type('11/19/2020');
         cy.get('[name="StartingTime"]').clear().type('12:00');
         cy.get('[name="LeavingDate"]').clear().type('11/19/2020');
         cy.get('[name="LeavingTime"]').clear().type('4:00');
         cy.get('[name="Submit"]').click();
         cy.get('.SubHead > b').should(($cost2) => {
              expect($cost2.text()).to.eq('$ 8.00')
               })
         cy.get('.BodyCopy > b').should(($cost3) => {
               expect($cost3.text()).to.include('(0 Days, 4 Hours, 0 Minutes)')
               })
     // valida el costo semanal
          cy.get('#ParkingLot').select('Economy Parking');
          cy.get('[name="StartingDate"]').clear().type('11/19/2020');
          cy.get('[name="StartingTime"]').clear().type('12:00');
          cy.get('[name="LeavingDate"]').clear().type('11/26/2020');
          cy.get('[name="LeavingTime"]').clear().type('12:00');
          cy.get('[name="Submit"]').click();
          cy.get('.SubHead > b').should(($cost2) => {
               expect($cost2.text()).to.eq('$ 54.00')
               })
          cy.get('.BodyCopy > b').should(($cost3) => {
               expect($cost3.text()).to.include('(7 Days, 0 Hours, 0 Minutes)')
               })


     })    
   })
  



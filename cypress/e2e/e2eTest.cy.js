

describe('template spec', () => {
    it('using custom command', () => {
        let payload ={
            "name":"AB Test 01",
            "email":"ABTestseliseqa4@yopmail.com",
            "gender":"female",
            "status":"active"
        }

        cy.postAPI(payload).then((response)=>{
            expect(response.status).to.be.equal(201)

            let userId=response.body.id
            cy.getAPI(userId).then((response)=>{
                cy.log(JSON.stringify(response))
                expect(response.status).to.be.equal(200)
            })

            cy.putAPI(userId).then((response)=>{
                expect(response.status).to.be.equal(200)
            })

            cy.deleteAPI(userId).then((response)=>{
                expect(response.status).to.be.equal(204)
            })

        })
 
    })
  })
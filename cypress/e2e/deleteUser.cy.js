


describe('template spec', () => {

    function generateRandomEmail(){
        const randomString=Math.random().toString(36).substring(2,10)
        const email=randomString+"@yopmail.com"
        return email
    }

    it('delete user', () => {
        let emailAddress=generateRandomEmail()
        let playload={
            "name":"AB Test Selise",
            "email":emailAddress,
            "gender":"female",
            "status":"inactive"
        }

        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users/',
            headers:{
              Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
            },
            body:playload,
            failOnStatusCode: false
            
          }).then((response)=>{
            // cy.log(JSON.stringify(response))
            expect(response.status).to.equal(201)
            expect(response.body).has.property('name', playload.name)
            expect(response.body).has.property('gender', playload.gender)
            expect(response.body).has.property('status', playload.status)


            const userid=response.body.id
            cy.request({
                method:'DELETE',
                url:'https://gorest.co.in/public/v2/users/'+userid,
                headers:{
                  Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
                }
                
              }).then((response)=>{
                expect(response.status).to.equal(204)
            })

            cy.request({
                method:'GET',
                url:'https://gorest.co.in/public/v2/users/'+userid,
                headers:{
                  Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
                },
                failOnStatusCode: false
                
              }).then((response)=>{
                expect(response.status).to.equal(404)
            })

        })  
          
    })

  })
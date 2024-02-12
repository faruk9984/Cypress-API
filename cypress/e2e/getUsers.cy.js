describe('API Automation using cypress', () => {

    it('Get Users', () => {

      cy.request({
        method:'GET',
        url:'https://gorest.co.in/public/v2/users/',
        headers:{
          Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)

      })

    })



    it('Get Users 1', () => {

      cy.request({
        method:'GET',
        url:'https://gorest.co.in/public/v2/users/6265120',
        headers:{
          Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
        }
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(6265120)

      })
    })




    it('Get Users Invalid Endpoint', () => {

      cy.request({
        method:'GET',
        url:'https://gorest.co.in/public/v2/user',
        headers:{
          Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
        },
        failOnStatusCode: false

      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(404)

      })
    })



    it('Get Users Invalid User', () => {

      cy.request({
        method:'GET',
        url:'https://gorest.co.in/public/v2/users/12345',
        headers:{
          Authorization:"Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910"
        },
        failOnStatusCode: false
        
      }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.equal(404)

      })
    })


  })
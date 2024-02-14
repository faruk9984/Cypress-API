import updateUser from '../config/user-update.json'
import userss from '../config/payload.json'

describe('PUT CALL using cypress', () => {
    it.skip('PUT CALL using json', () => {
        cy.request({
            method:'PUT',
            url:'https://gorest.co.in/public/v2/users/6360601',
            headers:{
                Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
            },
            body:{
                "name":"Faruk 420",
                "email":"farukTest123@yopmail.com"             
            }
            
        }).then((response)=>{
            expect(response.status).to.be.equal(200)
            expect(response.body).has.property("name","Faruk 420")
            // expect(response.body).has.property("email","farukTest11@yopmail.com")

        }) 
    })




    it.skip('PUT CALL using Fixture folder', () => {
        cy.fixture('payload-put-user').then((payload)=>{
            cy.request({
                method:'PUT',
                url:'https://gorest.co.in/public/v2/users/6360601',
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:payload
                
            }).then((response)=>{
                expect(response.status).to.be.equal(200)
                expect(response.body).has.property("name","Cypress 420")
    
            }) 
        })
    })
    



    it.skip('PUT CALL using config file', () => {
        cy.request({
            method:'PUT',
            url:'https://gorest.co.in/public/v2/users/6360601',
            headers:{
                Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
            },
            body:updateUser
            
        }).then((response)=>{
            expect(response.status).to.be.equal(200)
            expect(response.body).has.property("name","School 420")

        }) 
    })





    it('PUT CALL End to End Flow', () => {
        userss.email='random12348@yopmail.com'
        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users/',
            headers:{
                Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
            },
            body:userss
            
        }).then((response)=>{
            expect(response.status).to.be.equal(201)
 
            let id=response.body.id
            cy.request({
                method:'PUT',
                url:'https://gorest.co.in/public/v2/users/'+id,
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:updateUser

            }).then((response)=>{
                expect(response.status).to.be.equal(200)
                cy.request({
                    method:'GET',
                    url:'https://gorest.co.in/public/v2/users/'+id,
                    headers:{
                        Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                    }

                }).then((response)=>{
                    expect(response.status).to.be.equal(200)
                    expect(response.body).has.property('name',updateUser.name)
                    expect(response.body).has.property('gender',updateUser.gender)
        
                })
    
            }) 
            
        }) 
    })

  })
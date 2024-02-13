
import payload from '../config/payload.json'

describe('post call in cypress', () => {

    function generateRandomEmail(){
        const randomString=Math.random().toString(36).substring(2,10)
        const email=randomString+"@yopmail.com"
        return email
    }

    it('post call - json', () => {
        let emailAddress=generateRandomEmail()
        cy.log("Email: "+emailAddress)

        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users/',
            headers:{
                Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
            },
            body:{
                "name":"AB Test 01",
                // "email":"ABTest04@yopmail.com",
                "email":emailAddress,
                "gender":"male",
                "status":"active"
            }
        }).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).has.property("name","AB Test 01")
            expect(response.body).has.property("gender","male")
            expect(response.body).has.property("status","active")
            expect(response.body.id).to.not.be.null

        })    
    })


    it('post call - json step-2', () => {
        let emailAddress=generateRandomEmail()
        let playload={
            "name":"AB Test 01",
            // "email":"ABTest04@yopmail.com",
            "email":emailAddress,
            "gender":"male",
            "status":"active"
        }
        cy.log("Email: "+emailAddress)

        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users/',
            headers:{
                Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
            },
            body:playload

        }).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body).has.property("name","AB Test 01")
            expect(response.body).has.property("gender","male")
            expect(response.body).has.property("status","active")
            expect(response.body.id).to.not.be.null

        })    
    })



    it('post call - Fixer Folder', () => {
        cy.fixture('users').then((responseObject)=>{
            responseObject.email=generateRandomEmail()
            let emailAddress=responseObject.email
            cy.log("Email = " +emailAddress)

            cy.request({
                method:'POST',
                url:'https://gorest.co.in/public/v2/users/',
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:responseObject
    
            }).then((response)=>{
                expect(response.status).to.equal(201)
                expect(response.body).has.property("name","AB Test 01")
                expect(response.body).has.property("gender","male")
                expect(response.body).has.property("status","active")
                expect(response.body.id).to.not.be.null
    
            })  

        })
    })





    it('post call - config json from payload json file', () => {
            payload.email=generateRandomEmail()
            cy.log("Email: "+payload.email)

            cy.request({
                method:'POST',
                url:'https://gorest.co.in/public/v2/users/',
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:payload
    
            }).then((response)=>{
                expect(response.status).to.equal(201)
                expect(response.body).has.property("name","Faruk Test 01")
                expect(response.body).has.property("gender","female")
                expect(response.body).has.property("status","active")
                expect(response.body.id).to.not.be.null


                let id=response.body.id
                cy.request({
                    method:'GET',
                    url:'https://gorest.co.in/public/v2/users/'+id,
                    headers:{
                        Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                    }
                }).then((response)=>{
                    expect(response.status).to.be.equal(200)
                    expect(response.body).has.property("name","Faruk Test 01")
                    expect(response.body).has.property("gender","female")
                    expect(response.body).has.property("status","active")
                    expect(response.body.id).to.not.be.null
                })
    
            })  
        })
        




        it('post call - wrong hader', () => {
            payload.email=generateRandomEmail()
            cy.log("Email: "+payload.email)

            cy.request({
                method:'POST',
                url:'https://gorest.co.in/public/v2/users/',
                headers:{
                    Authorization:'Bearer'
                },
                body:payload,
                failOnStatusCode: false
    
            }).then((response)=>{
                expect(response.status).to.equal(401)               
    
            })  
        })


        it('post call - wrong data', () => {
            payload.email=null

            cy.request({
                method:'POST',
                url:'https://gorest.co.in/public/v2/users/',
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:payload,
                failOnStatusCode: false
    
            }).then((response)=>{
                expect(response.status).to.equal(422)               
    
            })  
        })


        it('post call - duplicate mail', () => {
            payload.email="ABTest1@yopmail.com"

            cy.request({
                method:'POST',
                url:'https://gorest.co.in/public/v2/users/',
                headers:{
                    Authorization:'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910'
                },
                body:payload,
                failOnStatusCode: false
    
            }).then((response)=>{
                expect(response.status).to.equal(422)               
    
            })  
        })
  })
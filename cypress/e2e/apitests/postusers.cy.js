/// <reference types = "Cypress" />

const dataJson = require('../../fixtures/createuser.json')
describe('post user request', () => {
    let token = '4292ad4d48e9f07b741b64bb7d508dc2ebb2541fb577747f70e8ed2be5164280'
    let randomText = ""
    let testEmail = ""

    it('create user request', () => {


        var letters = "akjswdajksdawkdlakjndbvdvsawdezadaowpowqlc"


        for (var i = 0; i < 10; i++) {
            randomText += letters.charAt(Math.floor(Math.random() * letters.length));

            testEmail = randomText + '@gmail.com'

        }





        cy.request({



            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: {
                "name": dataJson.name,
                "gender": dataJson.gender,
                "email": testEmail,
                "status": dataJson.status
            }
        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('gender', dataJson.gender)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name', dataJson.name)
            expect(res.body.data).has.property('status', dataJson.status)

        }).then((res) => {
            const userId = res.body.data.id
            cy.log("user id is: " + userId)

            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('id', userId)
                expect(res.body.data).has.property('name', dataJson.name)
                expect(res.body.data).has.property('status', dataJson.status)



            })

        })
    })
})



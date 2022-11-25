/// <reference types = "Cypress" />

describe('get api user tests',() =>{


    let accessToken ='292ad4d48e9f07b741b64bb7d508dc2ebb2541fb577747f70e8ed2be5164280'
    it('get users',()=>{

        cy.request({
                method : 'GET',
                url: 'https://gorest.co.in/public/v2/users',
                headers : {
                    'authorization' : "Bearer " + accessToken
                }
        }).then((res)=>{

            expect(res.status).to.eq(200)
            expect(res.body).to.have.length(10)
        })

    })

    it('get users by id test', ()=>{

        cy.request({
                method : 'GET',
                url: 'https://gorest.co.in/public/v2/users/3615',
                headers : {
                    'authorization' : "Bearer " + accessToken
                }
        }).then((res)=>{

            expect(res.status).to.eq(200)
           // expect(res.body).to.have.length(1)
            expect(res.body.name).to.eq('Uttam Dutta Esq.')

        })

    })
})
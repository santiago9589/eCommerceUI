import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react"
import React from "react";
import { ContextProps } from "../context/AppContext";
import { FakeProvider } from "./ProviderContainerTest";
import NavbarComponent from "../src/components/NavbarComponent.components"


const PropsContext: ContextProps = {
    state: {
        cart: [{
            name: "test1",
            price: 125,
            quantity: 2,
            imgProduct: "test1",
            id: "test1"
        }],
        productView: {
            Provider: "Sneaker Company",
            title: "Fall Limited Edition Sneakers",
            priceOff: 0.5,
            priceSell: 250,
            description: "These low-profile sneakers are your perfect casual wear companion Featuring a durable rubber outer sole,they’ll withstand everything the weather can offer"
        }
    },
    actions: {
        handleCart: jest.fn(),
        deleteCart: jest.fn(),
        handleTotal: 0,
        setCart: jest.fn()
    }
}
 
jest.mock("../src/hooks/useBarItems", () => ({
    useBar: ():[string,()=>void,string[]] => (["Collections", () => { }, ["Collections", "Man"]]),
}));

jest.mock("../src/hooks/useShow", () => ({
    useShow: ():[boolean,()=>void] => ([false,()=>{}]),
}));


beforeEach(() => {
    render(<FakeProvider PropsContext={PropsContext}>
        <NavbarComponent />
    </FakeProvider>)
})

afterEach(() => {
    cleanup()
})

describe("Navbar Component", () => {
    it("reenderiza correctamente", () => {
        expect(screen.getByText(/Collections/i)).toBeInTheDocument()
        expect(screen.getByText(/Man/i)).toBeInTheDocument()
        expect(screen.getByText(/1/i)).toBeInTheDocument()
    })

    it("cuando le doy click al carrito muestra el la ventana del carro", async() => {

        const cartElement = screen.getByRole("img", { name: "cart" })
        fireEvent.click(cartElement)    
        await waitFor(()=>{
            expect(screen.getByTestId("aside-cart")).toBeInTheDocument()
        })
        
    })


})

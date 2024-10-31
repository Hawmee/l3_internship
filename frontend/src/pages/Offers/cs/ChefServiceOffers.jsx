import React from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";

function ChefServiceOffers() {
    return (
        <>
            <MainContainer>
                <SearchContainer>Search goes there</SearchContainer>
                <div>
                    <Table />
                </div>
            </MainContainer>
        </>
    );
}

export default ChefServiceOffers;

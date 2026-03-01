import Header from "../components/layout/Header/Header";
import NavButton from "../components/layout/Header/NavButton";
import SearchBar from "../components/layout/Header/SearchBar";
import Brand from "../components/layout/Header/Brand";
import Main from "../components/layout/Main";

function Home() {
  return (
      <div id="mainContent">
        <Header>
          <Brand></Brand>
          <SearchBar></SearchBar>
          <NavButton></NavButton>
        </Header>
        <Main>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
            tempore? Error dolorem eaque dolorum tempora impedit voluptas,
            excepturi quidem maxime consequatur assumenda, ab doloremque!
            Officiis fugiat omnis recusandae voluptate nihil?
          </p>
        </Main>
      </div>
  );
}

export default Home;

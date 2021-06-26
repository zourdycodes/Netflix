import React, { useContext, useState, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { Loading, Header, Card } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import FooterContainer from "../containers/footer";

export default function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slidesRows, setSlidesRows] = useState([]);

  //warn => little bit hack
  //warn => profile Object will appear if the user oncClick is triggered
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlidesRows(slides[category]);
  }, [category, slides]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="bannerfix">
        <Header.Frame>
          <Header.Group>
            <Header.Logo src={logo} to={ROUTES.HOME} />
            <Header.TextLink
              onClick={() => setCategory("series")}
              active={category === "series" ? "true" : "false"}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              onClick={() => setCategory("films")}
              active={category === "films" ? "true" : "false"}
            >
              Film
            </Header.TextLink>
          </Header.Group>

          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>

                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallout>
            Watch Stranger Things Now!
          </Header.FeatureCallout>
          <Header.Text>
            In a small town where everyone knows everyone, a peculiar incident
            starts a chain of events that leads to the disappearance of a child,
            When a young boy vanishes, a small town uncovers a mystery involving
            secret experiments, terrifying supernatural forces and one strange
            little girl.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>
      {/* <Header.Shadow /> */}

      <Card.Group>
        {slidesRows.map((slideItem) => (
          <Card key={`${category}--${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image
                    src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <p>hello</p>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>

      <FooterContainer />
    </>
  ) : (
    <>
      <SelectProfileContainer user={user} setProfile={setProfile} />
    </>
  );
}

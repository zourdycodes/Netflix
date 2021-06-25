import React, { useContext, useState, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { Loading, Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export default function BrowseContainer({ slides }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  //warn => little bit hack
  //warn => profile Object will appear if the user oncClick is triggered
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="bannerfix">
        <Header.Frame>
          <Header.Group>
            <Header.Logo src={logo} to={ROUTES.HOME} />
            <Header.TextLink>Series</Header.TextLink>
            <Header.TextLink>Film</Header.TextLink>
          </Header.Group>

          <Header.Group>
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
        </Header.Feature>
      </Header>
    </>
  ) : (
    <>
      <SelectProfileContainer user={user} setProfile={setProfile} />
    </>
  );
}

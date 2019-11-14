import React from 'react';
import {
  Danger,
  Info,
  Muted,
  Primary,
  Quote,
  Success,
  Warning,
} from 'src/components/Typography';

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
};

const TypographyExample = () => (
  <div>
    <Quote
      text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."
      author=" Kanye West, Musician"
    />
    <Muted>
      Muted Text
    </Muted>
    <Primary>
      Primary Text
    </Primary>
    <Info>
      Info Text
    </Info>
    <Success>
      Success Text
    </Success>
    <Warning>
      Warning Text
    </Warning>
    <Danger>
      Danger Text
    </Danger>
  </div>
);

export default TypographyExample;

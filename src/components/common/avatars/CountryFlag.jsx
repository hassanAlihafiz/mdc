import ReactCountryFlag from 'react-country-flag';
import styled from 'styled-components'
import { countryName } from 'common/country';

export default function CountryFlag(props) {
  if (props.country) {
    const countryName0 = countryName(props.country);
    return (
      <Wrapper>
        <ReactCountryFlag countryCode={props.country} svg className={`imageContainer`} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <ReactCountryFlag countryCode={props.title} svg className={`imageContainer`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .imageContainer{
    margin-right: 8px;
    width: 35px !important;
    height: 35px !important;
  }
`

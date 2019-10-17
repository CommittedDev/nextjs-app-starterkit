---
to: pages/<%= h.changeCase.lower(name) %>.js
---
<% const pageLower = h.changeCase.lower(name) -%>
<% const pageUpper = h.changeCase.title(name) -%>
import React from 'react';
import Screen from 'src/screens/<%=pageLower %>';
import { withTranslation } from 'src/i18n';
import WithAuth from 'src/components/WithAuth';
import Head from 'next/head';
import Local from 'src/components/Local';

function <%=pageUpper %>Page(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <React.Fragment>
      <Head>
        <title><%=pageUpper %></title>
      </Head>
      <Screen {...props} />
      <Local />
    </React.Fragment>
  );
}

const ExtendedWithAuth = WithAuth({ isPrivate: <%=isPrivate %> })(<%=pageUpper %>Page);
ExtendedWithAuth.getInitialProps = async () => ({
  namespacesRequired: ['<%=pageLower %>', 'common'],
});

export default withTranslation(['blog', 'common'])(ExtendedWithAuth);
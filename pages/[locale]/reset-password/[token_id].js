import React, { Fragment } from 'react';
import Head from 'next/head';
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import { getStaticPaths, makeStaticProps } from '~/lib/getStatic';
import brand from '~/public/text/brand';
import ResetPassword from '~/components/Forms/ResetPassword';

function ResetPasswordPage({ query }) {

  const { token_id } = query;
  return (
    <Fragment>
      <Head>
        <title>
          {brand.saas.name + ' - Forget Password'}
        </title>
      </Head>
      <div>
        <ResetPassword token_id={token_id} />
      </div>
    </Fragment>
  );
}


ResetPasswordPage.getInitialProps = ({ query }) => {
  return { query };
};


// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default ResetPasswordPage;

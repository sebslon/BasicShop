import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>You must supply a password reset token!</p>
        <RequestReset />
      </>
    );
  }

  return (
    <>
      <p>Reset your password {query.token}</p>
      <Reset token={query.token} />
    </>
  );
}

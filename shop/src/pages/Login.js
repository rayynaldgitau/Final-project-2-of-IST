
import Header from "../components/header";
import Login from "../components/login";
export default function LoginPage() {
     return (
          <>
               <Header
                    heading="Login to create an account"
                    paragraph="Don't have an account? "
                    linkName="Signup"
                    linkUrl="/signup"
               />
               <Login />
          </>
     )
}


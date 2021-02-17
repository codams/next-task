import axios from "axios";
import Card from "components/Card";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import useSWR from "swr";

const Login = () => {
  const [homeStored, setHomeStored] = useLocalStorage("home");
  const router = useRouter();
  const [homeHash, setHomeHash] = useState("");
  const [loading, setLoading] = useState(false);
  // If not, let user give it
  // If not, let user create home and get the hash
  // Hash as a primary id and based on the name

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    loading && homeHash
      ? `https://young-ravine-65632.herokuapp.com/home/${homeHash}`
      : "",
    fetcher
  );

  const home = data ? data[0] : null;

  if (error) {
    setLoading(false);
  }

  if (home && loading) {
    setLoading(false);
    setHomeStored(home);
    router.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <Layout>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="p-4">
            <legend className="text-lg">
              Please, enter your informations below
            </legend>
            <div>
              <label htmlFor="homeHash" className="mr-2">
                Your home hash
              </label>
              <input
                value={homeHash}
                onChange={(e) => setHomeHash(e.target.value)}
                type="homeHash"
                name="homeHash"
                id="homeHash"
                placeholder="8 digits"
                className="bg-transparent focus:border-pink-200 outline-none text-center border-b-2 border-green-200  placeholder-green-300"
              />
              <Button
                className="ml-2"
                submit={true}
                disabled={loading}
                loading={loading}
              >
                Log in
              </Button>
            </div>
          </fieldset>
        </form>
        <div className="mt-5 flex">
          <Button onClick={() => router.push("/home/create")}>
            Create a new home
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Login;
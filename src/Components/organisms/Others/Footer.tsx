import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialSkype,
  SlSocialLinkedin,
  SlSocialYoutube,
  SlSocialTwitter,
} from "react-icons/sl";

const Footer = () => {
  return (
    <div className="flex-none w-full">
      <footer className="bg-gray-100 text-black p-4">
        <div className="flex justify-around pt-4 lg:container lg:mx-auto">
          <div className="mb-3">
            <h3 className=" text-lg font-bold text-gray-800">Usefull Links</h3>
            <p>About us</p>
            <p>Login</p>
            <p>Register</p>
            <p>Become Instructor</p>
            <p>Contact</p>
          </div>

          <div className="mb-3">
            <h3 className=" text-lg font-bold text-gray-800">Course</h3>
            <p>Machine Learning</p>
            <p>PhotoGraphy</p>
            <p>Figma</p>
            <p>UI/UX Design</p>
            <p>Data science</p>
          </div>

          <div className="hidden lg:block mb-3">
            <h3 className=" text-lg font-bold text-gray-800">Follow Us</h3>
            <div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="text-sec_pink">Lear</span>
                <span>Nest</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <p>
                <SlSocialFacebook />
              </p>
              <p>
                <SlSocialInstagram />
              </p>
              <p>
                <SlSocialSkype />
              </p>
              <p>
                <SlSocialLinkedin />
              </p>
              <p>
                <SlSocialYoutube />
              </p>
              <p>
                <SlSocialTwitter />
              </p>
            </div>
            <p className="text-sm mt-2">
              &copy; 2023 LearNest. All Rights Reserved.
            </p>
            <p className="text-sm mt-2">
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by{" "}
              <a
                href="https://twitter.com/iamnotstatic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sec_pink"
              >
                @mahtab_sani
              </a>
            </p>
          </div>
        </div>

        <div className="mb-3 text-center lg:hidden">
          <h3 className=" text-lg font-bold text-gray-800">Follow Us</h3>
          <div>
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-sec_pink">Lear</span>
              <span>Nest</span>
            </h1>
          </div>
          <div className="flex gap-3 items-center justify-center">
            <p>
              <SlSocialFacebook />
            </p>
            <p>
              <SlSocialInstagram />
            </p>
            <p>
              <SlSocialSkype />
            </p>
            <p>
              <SlSocialLinkedin />
            </p>
            <p>
              <SlSocialYoutube />
            </p>
            <p>
              <SlSocialTwitter />
            </p>
          </div>
        </div>

        <p className="text-sm text-center lg:hidden">
          &copy; 2023 LearNest. All Rights Reserved.
        </p>
        <p className="text-sm text-center lg:hidden">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://twitter.com/iamnotstatic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sec_pink"
          >
            @mahtab_sani
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;

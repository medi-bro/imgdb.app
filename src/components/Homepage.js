import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <>
      <section className="hmpage">
        <header className="start-header">
          <h1 className="hmpage-hdr">Medical Direct</h1>
          <Link to="/login">Login</Link>
          <p></p>
          <Link to="/consultants">Consultants</Link>
          <p></p>
          <img className="frst-image" src="/imgs/xray.jpg" alt=""></img>
        </header>
        <div>
          <div>
            <div>
              <h1>What do we do?</h1>
              <p className="lore-summary">
                {" "}
                Medical Direct provides quick access to imaging data to
                patients, primary care physicians, and other providers quickly
                and efficiently. At a glance, a patient or provider can view
                imaging data, prognoses, and other information in one place.
                There is no need to wait for hard copies of X-rays or other
                types of medical images, as they can be quickly uploaded to one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

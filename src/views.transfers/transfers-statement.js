import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import TransfersStatementModule from "../content/transfers/transfers-statement";

export default function TransfersSatement() {
  const metadata = {
    name: "Download Statement",
    banner: {
      link: "https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-1036.jpg?w=900",
    },
  };

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          {metadata.name}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_NAME}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_LINE}
        </title>
        <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
      </Helmet>

      <ContentFormat
        name={metadata.name}
        header={{
          size: "small",
          show: true,
          data: (
            <>
              <WebbHeader
                data={{ home: "/home", name: metadata.name, link: "transfers" }}
              />
            </>
          ),
        }}
        media={{
          size: "small",
          show: false,
          link: metadata.banner.link,
          data: <></>,
        }}
        content={{
          size: "small",
          show: true,
          data: (
            <>
              <div className="container">
                <WebbDividerMedium />
                <TransfersStatementModule />
                <WebbDividerMedium />
                <WebbDividerMedium />
                <WebbDividerMedium />
                <WebbDividerMedium />
                <WebbDividerMedium />
                <WebbDividerMedium />
              </div>
            </>
          ),
        }}
        footer={{
          size: "medium",
          data: (
            <>
              <div className=""></div>
            </>
          ),
        }}
      ></ContentFormat>
    </>
  );
}

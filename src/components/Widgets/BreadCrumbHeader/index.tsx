import { Speed } from "@material-ui/icons";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import styles from "./index.module.css";
interface crumbInterface {
  link: string;
  route: string;
  label: string;
}

interface BreadCrumbHeaderInterface {
  title: string;
}

const BreadCrumbHeader: React.FC<BreadCrumbHeaderInterface> = ({ title }) => {
  const router = useRouter();
  const [crumbs, setCrumbs] = useState<crumbInterface[]>();
  useEffect(() => {
    const segmentPath = router.asPath.split("/");
    // const segmentRoute = router.route.split('/')

    const crumbLinks = CombineAccumulatively(segmentPath);
    const crumbs = crumbLinks.map((link: string, index: any | number) => {
      const route = segmentPath[index];
      const crumb = {
        link: link,
        route: route,
        label: route,
      };
      return crumb;
    });

    setCrumbs(crumbs);
  }, [router.route, router.asPath]);

  function CombineAccumulatively(segments: Array<string>) {
    const links = segments.reduce(
      (acc: Array<string>, cur: string, curIndex: number) => {
        const last = curIndex > 1 ? acc[curIndex - 1] : "";
        const newPath = last + "/" + cur;
        acc.push(newPath);
        return acc;
      },
      []
    );
    return links;
  }

  return (
    <div className={classNames(` ${styles["bread-crumb-container"]} `)}>
      <h1 className={classNames(` ${styles.title}`)}>{title}</h1>
      <div className={classNames(`${styles.nav}`)}>
        <nav>
          <ol className={classNames(`${styles.list}`)}>
            {crumbs?.map((items, index) => {
              return (
                <Fragment key={index}>
                  {index == 0 ? (
                    <li>
                      <Speed style={{ fontSize: 16 }} />
                    </li>
                  ) : null}
                  {index > 1
                    ? isNaN(
                        Number(
                          items.label
                            .split(/(?=[A-Z])/)
                            ?.join(" ")
                            .split("?")[0]
                        )
                      ) && <li>{">"}</li>
                    : null}
                  <li
                    className={
                      index == crumbs.length - 1
                        ? "text-gray-400  "
                        : "text-gray-800 "
                    }
                  >
                    {index == crumbs.length - 1
                      ? isNaN(
                          Number(
                            items.label
                              .split(/(?=[A-Z])/)
                              ?.join(" ")
                              .split("?")[0]
                          )
                        ) && (
                          <p>
                            {" "}
                            {
                              items.label
                                .split(/(?=[A-Z])/)
                                ?.join(" ")
                                .split("?")[0]
                            }
                          </p>
                        )
                      : isNaN(
                          Number(
                            items.label
                              .split(/(?=[A-Z])/)
                              ?.join(" ")
                              .split("?")[0]
                          )
                        ) && (
                          <Link href={items.link} legacyBehavior>
                            <a> {items.label.split(/(?=[A-Z])/)?.join(" ")}</a>
                          </Link>
                        )}
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumbHeader;

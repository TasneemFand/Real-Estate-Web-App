import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as {
    statusText?: string;
    status?: string;
    message?: string;
  };
  const { t } = useTranslation("notfound");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
      <h1>{t("oops")}</h1>
      <p>{t("title")}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

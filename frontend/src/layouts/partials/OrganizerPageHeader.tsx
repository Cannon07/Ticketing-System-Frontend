import { humanize } from "@/lib/utils/textConverter";

const OrganizerPageHeader = ({ title }: { title: string }) => {
  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-14 dark:from-darkmode-body dark:to-darkmode-theme-light">
          <h1>{humanize(title)}</h1>
        </div>
      </div>
    </section>
  );
};

export default OrganizerPageHeader;

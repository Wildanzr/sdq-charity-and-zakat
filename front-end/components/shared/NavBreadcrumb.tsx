import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Navigation {
  label: string;
  href: string;
}

interface NavBreadcrumbProps {
  navigations: Navigation[];
}

const NavBreadcrumb = ({ navigations }: NavBreadcrumbProps) => {
  const lastNav =
    "text-neutral-base m-body-small hover:text-neutral-base hover:underline";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navigations.map((nav, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center space-x-1"
          >
            <BreadcrumbItem key={nav.href}>
              <Link href={nav.href} legacyBehavior>
                <BreadcrumbLink
                  href={nav.href}
                  className={
                    index === navigations.length - 1
                      ? lastNav
                      : "text-neutral-70 m-body-small hover:text-neutral-70 hover:underline"
                  }
                >
                  {nav.label}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            {index !== navigations.length - 1 && (
              <BreadcrumbSeparator>{">"}</BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumb;

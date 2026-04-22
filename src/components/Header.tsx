"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person } from "@/resources";
import { defaultLocale, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getLocaleFromPath, stripLocaleFromPath, toLocalePath } from "@/i18n/utils";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const currentLocale = getLocaleFromPath(pathname) ?? defaultLocale;
  const messages = getMessages(currentLocale);
  const cleanPathname = stripLocaleFromPath(pathname || "/");

  const getLocalizedRoute = (route: string) => toLocalePath(route, currentLocale);
  const getSwitchLocaleRoute = (locale: (typeof locales)[number]) =>
    toLocalePath(pathname || "/", locale);

  const isSelected = (route: string) => {
    if (route === "/") {
      return cleanPathname === "/";
    }

    return cleanPathname === route || cleanPathname.startsWith(`${route}/`);
  };

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href={getLocalizedRoute("/")} selected={isSelected("/")} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={getLocalizedRoute("/about")}
                      label={messages.nav.about}
                      selected={isSelected("/about")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={getLocalizedRoute("/about")}
                      selected={isSelected("/about")}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href={getLocalizedRoute("/work")}
                      label={messages.nav.projects}
                      selected={isSelected("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href={getLocalizedRoute("/work")}
                      selected={isSelected("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/contact"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="email"
                      href={getLocalizedRoute("/contact")}
                      label={messages.nav.contact}
                      selected={isSelected("/contact")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="email"
                      href={getLocalizedRoute("/contact")}
                      selected={isSelected("/contact")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={getLocalizedRoute("/blog")}
                      label={messages.nav.blog}
                      selected={isSelected("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={getLocalizedRoute("/blog")}
                      selected={isSelected("/blog")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href={getLocalizedRoute("/gallery")}
                      label={messages.nav.gallery}
                      selected={isSelected("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href={getLocalizedRoute("/gallery")}
                      selected={isSelected("/gallery")}
                    />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <Row gap="4" aria-label={messages.switcherLabel}>
                {locales.map((locale) => (
                  <ToggleButton
                    key={locale}
                    href={getSwitchLocaleRoute(locale)}
                    label={locale.toUpperCase()}
                    selected={currentLocale === locale}
                  />
                ))}
              </Row>
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && (
                <TimeDisplay
                  timeZone={person.location}
                  locale={currentLocale === "fr" ? "fr-FR" : "en-GB"}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};

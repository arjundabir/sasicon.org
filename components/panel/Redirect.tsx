"use client";

import { Panel } from "@/types/panel";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import useReloadWhenOnline from "@/utils/reload-when-online";

const Redirect = ({ panel }: { panel: Panel }) => {
  useEffect(() => {
    const channels = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "panel" },
        (payload) => {
          if (payload.new.status && payload.new.id === panel.id) {
            window.location.href = `/panel`;
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [supabase]);

  useReloadWhenOnline();

  return <></>;
};

export default Redirect;

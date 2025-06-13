export {};

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace accounts {
      namespace id {
        interface CredentialResponse {
          credential: string;
          select_by: string;
          clientId: string;
        }

        interface IdConfiguration {
          client_id: string;
          callback: (response: CredentialResponse) => void;
          auto_select?: boolean;
          cancel_on_tap_outside?: boolean;
          context?: "signin" | "signup" | "use";
          ux_mode?: "popup" | "redirect";
          login_uri?: string;
          native_callback?: Function;
        }

        interface PromptMomentNotification {
          isNotDisplayed(): boolean;
          isSkippedMoment(): boolean;
          isDismissedMoment(): boolean;
          getMomentType(): string;
          getNotDisplayedReason?(): string;
          getSkippedReason?(): string;
          getDismissedReason?(): string;
        }

        function initialize(config: IdConfiguration): void;

        function renderButton(
          parent: HTMLElement | null,
          options: {
            type?: string;
            theme?: "outline" | "filled_blue" | "filled_black";
            size?: "small" | "medium" | "large";
            text?: "signin_with" | "signup_with" | "continue_with" | "sign_in";
            shape?: "rectangular" | "pill" | "circle" | "square";
            logo_alignment?: "left" | "center";
            width?: number;
          }
        ): void;

        function prompt(
          callback?: (notification: PromptMomentNotification) => void
        ): void;
      }
    }
  }
}

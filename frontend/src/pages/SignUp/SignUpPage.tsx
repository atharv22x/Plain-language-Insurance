/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import VisualNarrative from "./components/VisualNarrative";
import SignupForm from "./components/SignupForm";

export default function App() {
  return (
    <div className="min-h-screen flex items-stretch">
      <VisualNarrative />
      <SignupForm />
    </div>
  );
}


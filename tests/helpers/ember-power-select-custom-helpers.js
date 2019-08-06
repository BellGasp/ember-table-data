import { click, settled } from '@ember/test-helpers';
import { isEmpty } from '@ember/utils';

// Code picked directly from ember-power-select
async function openIfClosedAndGetContentId(trigger) {
  let contentId = trigger.attributes['aria-owns'] && `${trigger.attributes['aria-owns'].value}`;
  let content = contentId ? document.querySelector(`#${contentId}`) : undefined;
  // If the dropdown is closed, open it
  if (!content || content.classList.contains('ember-basic-dropdown-content-placeholder')) {
    await click(trigger);
    await settled();
    contentId = `${trigger.attributes['aria-owns'].value}`;
  }
  return contentId;
}

// Code picked directly from ember-power-select and modified to fit our needs
export async function isOptionInList(cssPathOrTrigger, valueOrSelector, optionIndex) {
  let trigger, target;
  if (cssPathOrTrigger instanceof HTMLElement) {
    if (cssPathOrTrigger.classList.contains('ember-power-select-trigger')) {
      trigger = cssPathOrTrigger;
    } else {
      trigger = cssPathOrTrigger.querySelector('.ember-power-select-trigger');
    }
  } else {
    trigger = document.querySelector(`${cssPathOrTrigger} .ember-power-select-trigger`);

    if (!trigger) {
      trigger = document.querySelector(cssPathOrTrigger);
    }

    if (!trigger) {
      throw new Error(`You called "isOptionInList('${cssPathOrTrigger}', '${valueOrSelector}')" but no select was found using selector "${cssPathOrTrigger}"`);
    }
  }

  if (trigger.scrollIntoView) {
    trigger.scrollIntoView();
  }

  let contentId = await openIfClosedAndGetContentId(trigger);
  // Select the option with the given text
  let options = document.querySelectorAll(`#${contentId} .ember-power-select-option`);
  let potentialTargets = [].slice.apply(options).filter((opt) => opt.textContent.indexOf(valueOrSelector) > -1);
  if (potentialTargets.length === 0) {
    potentialTargets = document.querySelectorAll(`#${contentId} ${valueOrSelector}`);
  }
  if (potentialTargets.length > 1) {
    let filteredTargets = [].slice.apply(potentialTargets).filter((t) => t.textContent.trim() === valueOrSelector);
    if (optionIndex === undefined) {
      target = filteredTargets[0] || potentialTargets[0];
    } else {
      target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
    }
  } else {
    target = potentialTargets[0];
  }

  return !isEmpty(target);
}

function prepareActionButtons() {
  document.querySelectorAll('main p').forEach(paragraph => {
    const links = [...paragraph.children].filter(element => element.tagName === 'A');
    const hasPrimary = links.some(link => link.classList.contains('button') || link.hasAttribute('download'));
    const actions = links.filter(link => {
      const href = link.getAttribute('href') || '';
      return link.classList.contains('button') || link.hasAttribute('download') ||
        (!/^(?:https?:|\/\/)/.test(href) && (/\.(?:md|csv|zip|py|sql|json|pdf|html)(?:[?#]|$)/i.test(href) || (hasPrimary && href.startsWith('#'))));
    });
    if (!actions.length) return;
    const group = document.createElement('span');
    group.className = 'action-group';
    paragraph.insertBefore(group, actions[0]);
    actions.forEach(link => {
      if (!link.classList.contains('button')) link.classList.add('button', 'secondary');
      group.append(link);
    });
    // Replace separators between actions with CSS spacing; retain explanatory prose.
    [...paragraph.childNodes].forEach(node => {
      if (node.nodeType === 3 && /^[\s·|]+$/.test(node.textContent)) node.remove();
      else if (node.nodeType === 3) node.textContent = node.textContent.replace(/^\s*\.\s+(?=[A-Z])/, '');
    });
  });
}
window.addEventListener('hashchange', prepareActionButtons);
prepareActionButtons();


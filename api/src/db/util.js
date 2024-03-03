export function toPlainObj(model) {
  if (model instanceof Array) {
    return model.map((m) => toPlainObj(m));
  } else {
    return model.get({ plain: true });
  }
}

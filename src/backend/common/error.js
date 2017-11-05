class CodeHighError extends Error {
}

class NotFoundError extends CodeHighError {
}

class PermissionError extends CodeHighError {
}

class AuthorizationError extends CodeHighError {
}

export {
  CodeHighError,
  NotFoundError,
  PermissionError,
  AuthorizationError,
};
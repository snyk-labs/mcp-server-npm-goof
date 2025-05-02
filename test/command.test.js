import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getNpmPackageInfo, sanitizePackageName } from '../command.js';
import { EventEmitter } from 'events';
import * as childProcess from 'child_process';

// Mock for execFile that returns an object with eventEmitters for stdout and stderr
vi.mock('child_process', () => {
  return {
    execFile: vi.fn()
  };
});

describe('sanitizePackageName', () => {
  it('should accept valid package names', () => {
    expect(() => sanitizePackageName('react')).not.toThrow();
    expect(() => sanitizePackageName('lodash')).not.toThrow();
    expect(() => sanitizePackageName('@angular/core')).not.toThrow();
    expect(() => sanitizePackageName('some-package')).not.toThrow();
    expect(() => sanitizePackageName('package.name')).not.toThrow();
  });

  it('should reject package names with command injection characters', () => {
    expect(() => sanitizePackageName('package;rm')).toThrow();
    expect(() => sanitizePackageName('package&ls')).toThrow();
    expect(() => sanitizePackageName('package|cat')).toThrow();
    expect(() => sanitizePackageName('package`command`')).toThrow();
    expect(() => sanitizePackageName('package$PATH')).toThrow();
    expect(() => sanitizePackageName('package>file')).toThrow();
    expect(() => sanitizePackageName('package<file')).toThrow();
    expect(() => sanitizePackageName('package!command')).toThrow();
    expect(() => sanitizePackageName('package\\file')).toThrow();
  });

  it('should reject package names that do not comply with NPM format', () => {
    expect(() => sanitizePackageName('')).toThrow();
    expect(() => sanitizePackageName(' ')).toThrow();
    expect(() => sanitizePackageName('UPPERCASE')).toThrow();
    expect(() => sanitizePackageName('package with spaces')).toThrow();
    expect(() => sanitizePackageName('@/invalid')).toThrow();
  });
});

describe('getNpmPackageInfo', () => {
  // Setup for mocks for each test
  let mockStdout;
  let mockStderr;
  let mockProcess;

  beforeEach(() => {
    // Create emitters to simulate stdout and stderr
    mockStdout = new EventEmitter();
    mockStderr = new EventEmitter();
    
    // Create mock for the process
    mockProcess = {
      stdout: mockStdout,
      stderr: mockStderr,
      on: vi.fn((event, callback) => {
        if (event === 'close') {
          mockProcess.closeCallback = callback;
        }
      }),
      closeCallback: null
    };

    // Configure the behavior of the execFile mock
    childProcess.execFile.mockReturnValue(mockProcess);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should execute npm view with the correct package name', async () => {
    // Start the function and keep the promise unresolved
    const promise = getNpmPackageInfo({ packageName: 'react' });
    
    // Verify that execFile was called with the correct arguments
    expect(childProcess.execFile).toHaveBeenCalledWith(
      'npm', 
      ['view', 'react'], 
      { encoding: 'utf-8' }
    );

    // Resolve the promise by simulating data on stdout
    mockStdout.emit('data', 'React package data');
    await promise;
  });

  it('should resolve with the content when stdout receives data', async () => {
    const promise = getNpmPackageInfo({ packageName: 'lodash' });
    
    // Simulate data on stdout
    mockStdout.emit('data', 'Lodash package data');
    
    const result = await promise;
    expect(result).toBe('Lodash package data');
  });

  it('should reject the promise when stderr receives data', async () => {
    const promise = getNpmPackageInfo({ packageName: 'non-existent-package' });
    
    // Simulate error on stderr
    mockStderr.emit('data', 'Error: package not found');
    
    await expect(promise).rejects.toBe('Error: package not found');
  });

  it('should resolve with content object when the process ends with code 0', async () => {
    const promise = getNpmPackageInfo({ packageName: 'express' });
    
    // Simulate successful completion
    mockProcess.closeCallback(0);
    
    const result = await promise;
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: mockProcess
        }
      ]
    });
  });

  it('should reject with error when the process ends with a non-zero code', async () => {
    const promise = getNpmPackageInfo({ packageName: 'error-package' });
    
    // Simulate completion with error
    mockProcess.closeCallback(1);
    
    await expect(promise).rejects.toThrow('npm view error-package failed with code 1');
  });

  it('should reject when attempting to inject malicious commands', async () => {
    const maliciousPackage = 'fake-package && rm -rf /';
    
    // The function should throw an error due to sanitization
    await expect(getNpmPackageInfo({ packageName: maliciousPackage })).rejects.toThrow();
    
    // Verify that execFile was never called with the malicious input
    expect(childProcess.execFile).not.toHaveBeenCalled();
  });
}); 
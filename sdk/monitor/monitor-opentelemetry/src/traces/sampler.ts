// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * TODO: Remove this sampler in favor of the implementation in the AzMon Exporter once we support M2M approach for standard metrics.
 * This sampler specifically marks spans as sampled out and records them instead of dropping the span altogether.
 */
import type { Link, Attributes, SpanKind, Context } from "@opentelemetry/api";
import { diag } from "@opentelemetry/api";
import type { Sampler, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorSampleRate } from "../types.js";

/**
 * ApplicationInsightsSampler is responsible for the following:
 * Implements same trace id hashing algorithm so that traces are sampled the same across multiple nodes
 * Adds item count to span attribute if span is sampled (needed for ingestion service)
 * @param samplingRatio - 0 to 1 value.
 */
export class ApplicationInsightsSampler implements Sampler {
  private readonly _sampleRate: number;
  private readonly _samplingRatio: number;

  /**
   * Initializes a new instance of the ApplicationInsightsSampler class.
   * @param samplingRatio - Value in the range [0,1], 1 meaning all data will sampled and 0 all Tracing data will be sampled out.
   */
  constructor(samplingRatio: number = 1) {
    this._samplingRatio = samplingRatio;
    if (
      this._samplingRatio > 1 ||
      this._samplingRatio < 0 ||
      !Number.isFinite(this._samplingRatio)
    ) {
      diag.warn("Invalid sampling rate, sampling rate must be a value in the range [0,1].");
    }
    this._sampleRate = Math.round(this._samplingRatio * 100);
  }

  /**
   * Checks whether span needs to be created and tracked.
   *
   * @param context - Parent Context which may contain a span.
   * @param traceId - of the span to be created. It can be different from the
   *     traceId in the {@link SpanContext}. Typically in situations when the
   *     span to be created starts a new trace.
   * @param spanName - of the span to be created.
   * @param spanKind - of the span to be created.
   * @param attributes - Initial set of SpanAttributes for the Span being constructed.
   * @param links - Collection of links that will be associated with the Span to
   *     be created. Typically useful for batch operations.
   * @returns a {@link SamplingResult}.
   */
  public shouldSample(
    // @ts-expect-error unused var
    context: Context,
    traceId: string,
    // @ts-expect-error unused var
    spanName: string,
    // @ts-expect-error unused var
    spanKind: SpanKind,
    attributes: Attributes,
    // @ts-expect-error unused var
    links: Link[],
  ): SamplingResult {
    let isSampledIn = false;
    if (this._sampleRate === 100) {
      isSampledIn = true;
    } else if (this._sampleRate === 0) {
      isSampledIn = false;
    } else {
      isSampledIn = this._getSamplingHashCode(traceId) < this._sampleRate;
    }
    // Add sample rate as span attribute if it is not 100
    attributes = attributes || {};
    if (this._sampleRate !== 100) {
      attributes[AzureMonitorSampleRate] = this._sampleRate;
    }
    return isSampledIn
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.RECORD, attributes: attributes };
  }

  /**
   * Return Sampler description
   */
  public toString(): string {
    return `ApplicationInsightsSampler{${this._samplingRatio}}`;
  }

  private _getSamplingHashCode(input: string): number {
    const csharpMin = -2147483648;
    const csharpMax = 2147483647;
    let hash = 5381;

    if (!input) {
      return 0;
    }

    while (input.length < 8) {
      input = input + input;
    }

    for (let i = 0; i < input.length; i++) {
      // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
      hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i)) | 0;
    }

    hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
    return (hash / csharpMax) * 100;
  }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

/*
 * This file was generated from the OpenSearch API Spec. Do NOT edit it
 * manually. If you want to make changes, either update the spec or
 * modify the API generator.
 */

import * as Common from './_common'
import * as Common_Analysis from './_common.analysis'
import * as Core_Search from './_core.search'

export type BoolQuery = QueryBase & {
  adjust_pure_negative?: boolean;
  filter?: QueryContainer | QueryContainer[];
  minimum_should_match?: Common.MinimumShouldMatch;
  must?: QueryContainer | QueryContainer[];
  must_not?: QueryContainer | QueryContainer[];
  should?: QueryContainer | QueryContainer[];
}

export type BoostingQuery = QueryBase & {
  negative: QueryContainer;
  negative_boost: number;
  positive: QueryContainer;
}

export type ChildScoreMode = 'avg' | 'max' | 'min' | 'none' | 'sum'

export type CombinedFieldsOperator = 'and' | 'or'

export type CombinedFieldsQuery = QueryBase & {
  auto_generate_synonyms_phrase_query?: boolean;
  fields: Common.Field[];
  minimum_should_match?: Common.MinimumShouldMatch;
  operator?: CombinedFieldsOperator;
  query: string;
  zero_terms_query?: CombinedFieldsZeroTerms;
}

export type CombinedFieldsZeroTerms = 'all' | 'none'

export type CommonTermsQuery = QueryBase & {
  analyzer?: string;
  cutoff_frequency?: number;
  high_freq_operator?: Operator;
  low_freq_operator?: Operator;
  minimum_should_match?: Common.MinimumShouldMatch;
  query: string;
}

export type ConstantScoreQuery = QueryBase & {
  filter: QueryContainer;
}

export type DateDecayFunction = DecayFunctionBase & Record<string, any>

export type DateDistanceFeatureQuery = DistanceFeatureQueryBaseDateMathDuration & Record<string, any>

export type DateRangeQuery = RangeQueryBase & {
  format?: Common.DateFormat;
  from?: Common.DateMath | undefined;
  gt?: Common.DateMath;
  gte?: Common.DateMath;
  lt?: Common.DateMath;
  lte?: Common.DateMath;
  time_zone?: Common.TimeZone;
  to?: Common.DateMath | undefined;
}

export type DecayFunction = DateDecayFunction | NumericDecayFunction | GeoDecayFunction

export type DecayFunctionBase = {
  multi_value_mode?: MultiValueMode;
}

export type DisMaxQuery = QueryBase & {
  queries: QueryContainer[];
  tie_breaker?: number;
}

export type DistanceFeatureQuery = GeoDistanceFeatureQuery | DateDistanceFeatureQuery

export type DistanceFeatureQueryBaseDateMathDuration = QueryBase & {
  field: Common.Field;
  origin: Common.DateMath;
  pivot: Common.Duration;
}

export type DistanceFeatureQueryBaseGeoLocationDistance = QueryBase & {
  field: Common.Field;
  origin: Common.GeoLocation;
  pivot: Common.Distance;
}

export type ExistsQuery = QueryBase & {
  field: Common.Field;
}

export type FieldAndFormat = {
  field: Common.Field;
  format?: string;
  include_unmapped?: boolean;
}

export type FieldValueFactorModifier = 'ln' | 'ln1p' | 'ln2p' | 'log' | 'log1p' | 'log2p' | 'none' | 'reciprocal' | 'sqrt' | 'square'

export type FieldValueFactorScoreFunction = {
  factor?: number;
  field: Common.Field;
  missing?: number;
  modifier?: FieldValueFactorModifier;
}

export type FunctionBoostMode = 'avg' | 'max' | 'min' | 'multiply' | 'replace' | 'sum'

export type FunctionScoreContainer = {
  exp?: DecayFunction;
  field_value_factor?: FieldValueFactorScoreFunction;
  filter?: QueryContainer;
  gauss?: DecayFunction;
  linear?: DecayFunction;
  random_score?: RandomScoreFunction;
  script_score?: ScriptScoreFunction;
  weight?: number;
}

export type FunctionScoreMode = 'avg' | 'first' | 'max' | 'min' | 'multiply' | 'sum'

export type FunctionScoreQuery = QueryBase & {
  boost_mode?: FunctionBoostMode;
  functions?: FunctionScoreContainer[];
  max_boost?: number;
  min_score?: number;
  query?: QueryContainer;
  score_mode?: FunctionScoreMode;
}

export type FuzzyQuery = QueryBase & {
  fuzziness?: Common.Fuzziness;
  max_expansions?: number;
  prefix_length?: number;
  rewrite?: Common.MultiTermQueryRewrite;
  transpositions?: boolean;
  value: string | number | boolean;
}

export type GeoBoundingBoxQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  type?: GeoExecution;
  validation_method?: GeoValidationMethod;
  [key: string]: any | Common.GeoBounds;
}

export type GeoDecayFunction = DecayFunctionBase & Record<string, any>

export type GeoDistanceFeatureQuery = DistanceFeatureQueryBaseGeoLocationDistance & Record<string, any>

export type GeoDistanceQuery = QueryBase & {
  distance: Common.Distance;
  distance_type?: Common.GeoDistanceType;
  ignore_unmapped?: IgnoreUnmapped;
  validation_method?: GeoValidationMethod;
  [key: string]: any | Common.GeoLocation;
}

export type GeoExecution = 'indexed' | 'memory'

export type GeoPolygonQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  validation_method?: GeoValidationMethod;
}

export type GeoShape = {
  coordinates?: any[];
  type?: string;
}

export type GeoShapeField = {
  relation?: Common.GeoShapeRelation;
  shape: GeoShape;
}

export type GeoShapeQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  [key: string]: any | GeoShapeField;
}

export type GeoValidationMethod = 'coerce' | 'ignore_malformed' | 'strict'

export type HasChildQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  inner_hits?: Core_Search.InnerHits;
  max_children?: number;
  min_children?: number;
  query: QueryContainer;
  score_mode?: ChildScoreMode;
  type: Common.RelationName;
}

export type HasParentQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  inner_hits?: Core_Search.InnerHits;
  parent_type: Common.RelationName;
  query: QueryContainer;
  score?: boolean;
}

export type IdsQuery = QueryBase & {
  values?: Common.Ids;
}

export type IgnoreUnmapped = boolean

export type IntervalsAllOf = {
  filter?: IntervalsFilter;
  intervals: IntervalsContainer[];
  max_gaps?: number;
  ordered?: boolean;
}

export type IntervalsAnyOf = {
  filter?: IntervalsFilter;
  intervals: IntervalsContainer[];
}

export type IntervalsContainer = {
  all_of?: IntervalsAllOf;
  any_of?: IntervalsAnyOf;
  fuzzy?: IntervalsFuzzy;
  match?: IntervalsMatch;
  prefix?: IntervalsPrefix;
  wildcard?: IntervalsWildcard;
}

export type IntervalsFilter = {
  after?: IntervalsContainer;
  before?: IntervalsContainer;
  contained_by?: IntervalsContainer;
  containing?: IntervalsContainer;
  not_contained_by?: IntervalsContainer;
  not_containing?: IntervalsContainer;
  not_overlapping?: IntervalsContainer;
  overlapping?: IntervalsContainer;
  script?: Common.Script;
}

export type IntervalsFuzzy = {
  analyzer?: string;
  fuzziness?: Common.Fuzziness;
  prefix_length?: number;
  term: string;
  transpositions?: boolean;
  use_field?: Common.Field;
}

export type IntervalsMatch = {
  analyzer?: string;
  filter?: IntervalsFilter;
  max_gaps?: number;
  ordered?: boolean;
  query: string;
  use_field?: Common.Field;
}

export type IntervalsPrefix = {
  analyzer?: string;
  prefix: string;
  use_field?: Common.Field;
}

export type IntervalsQuery = QueryBase & {
  all_of?: IntervalsAllOf;
  any_of?: IntervalsAnyOf;
  fuzzy?: IntervalsFuzzy;
  match?: IntervalsMatch;
  prefix?: IntervalsPrefix;
  wildcard?: IntervalsWildcard;
}

export type IntervalsWildcard = {
  analyzer?: string;
  pattern: string;
  use_field?: Common.Field;
}

export type KnnQuery = Record<string, Common.KnnField>

export type Like = string | LikeDocument

export type LikeDocument = {
  _id?: Common.Id;
  _index?: Common.IndexName;
  doc?: Record<string, any>;
  fields?: Common.Field[];
  per_field_analyzer?: Record<string, string>;
  routing?: Common.Routing;
  version?: Common.VersionNumber;
  version_type?: Common.VersionType;
}

export type MatchAllQuery = QueryBase

export type MatchBoolPrefixQuery = QueryBase & {
  analyzer?: string;
  fuzziness?: Common.Fuzziness;
  fuzzy_rewrite?: Common.MultiTermQueryRewrite;
  fuzzy_transpositions?: boolean;
  max_expansions?: number;
  minimum_should_match?: Common.MinimumShouldMatch;
  operator?: Operator;
  prefix_length?: number;
  query: string;
}

export type MatchNoneQuery = QueryBase & Record<string, any>

export type MatchPhrasePrefixQuery = QueryBase & {
  analyzer?: string;
  max_expansions?: number;
  query: string;
  slop?: number;
  zero_terms_query?: ZeroTermsQuery;
}

export type MatchPhraseQuery = QueryBase & {
  analyzer?: string;
  query: string;
  slop?: number;
  zero_terms_query?: ZeroTermsQuery;
}

export type MatchQuery = QueryBase & {
  analyzer?: string;
  auto_generate_synonyms_phrase_query?: boolean;
  cutoff_frequency?: number;
  fuzziness?: Common.Fuzziness;
  fuzzy_rewrite?: Common.MultiTermQueryRewrite;
  fuzzy_transpositions?: boolean;
  lenient?: boolean;
  max_expansions?: number;
  minimum_should_match?: Common.MinimumShouldMatch;
  operator?: Operator;
  prefix_length?: number;
  query: string | number | boolean;
  zero_terms_query?: ZeroTermsQuery;
}

export type MoreLikeThisQuery = QueryBase & {
  analyzer?: string;
  boost_terms?: number;
  fail_on_unsupported_field?: boolean;
  fields?: Common.Field[];
  include?: boolean;
  like: Like | Like[];
  max_doc_freq?: number;
  max_query_terms?: number;
  max_word_length?: number;
  min_doc_freq?: number;
  min_term_freq?: number;
  min_word_length?: number;
  minimum_should_match?: Common.MinimumShouldMatch;
  per_field_analyzer?: Record<string, string>;
  routing?: Common.Routing;
  stop_words?: Common_Analysis.StopWords;
  unlike?: Like | Like[];
  version?: Common.VersionNumber;
  version_type?: Common.VersionType;
}

export type MultiMatchQuery = QueryBase & {
  analyzer?: string;
  auto_generate_synonyms_phrase_query?: boolean;
  cutoff_frequency?: number;
  fields?: Common.Fields;
  fuzziness?: Common.Fuzziness;
  fuzzy_rewrite?: Common.MultiTermQueryRewrite;
  fuzzy_transpositions?: boolean;
  lenient?: boolean;
  max_expansions?: number;
  minimum_should_match?: Common.MinimumShouldMatch;
  operator?: Operator;
  prefix_length?: number;
  query: string;
  slop?: number;
  tie_breaker?: number;
  type?: TextQueryType;
  zero_terms_query?: ZeroTermsQuery;
}

export type MultiValueMode = 'avg' | 'max' | 'min' | 'sum'

export type NestedQuery = QueryBase & {
  ignore_unmapped?: IgnoreUnmapped;
  inner_hits?: Core_Search.InnerHits;
  path: Common.Field;
  query: QueryContainer;
  score_mode?: ChildScoreMode;
}

export type NeuralQuery = QueryBase & Record<string, NeuralQueryVectorField>

export type NeuralQueryVectorField = {
  filter?: QueryContainer;
  k?: number;
  max_distance?: number;
  min_score?: number;
  model_id?: string;
  query_image?: string;
  query_text?: string;
}

export type NumberRangeQuery = RangeQueryBase & {
  from?: undefined | number | string;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  to?: undefined | number | string;
}

export type NumericDecayFunction = DecayFunctionBase & Record<string, any>

export type Operator = 'and' | 'or'

export type ParentIdQuery = QueryBase & {
  id?: Common.Id;
  ignore_unmapped?: IgnoreUnmapped;
  type?: Common.RelationName;
}

export type PercolateQuery = QueryBase & {
  document?: Record<string, any>;
  documents?: Record<string, any>[];
  field: Common.Field;
  id?: Common.Id;
  index?: Common.IndexName;
  name?: string;
  preference?: string;
  routing?: Common.Routing;
  version?: Common.VersionNumber;
}

export type PinnedDoc = {
  _id: Common.Id;
  _index: Common.IndexName;
}

export type PinnedQuery = QueryBase & Record<string, any>

export type PrefixQuery = QueryBase & {
  case_insensitive?: boolean;
  rewrite?: Common.MultiTermQueryRewrite;
  value: string;
}

export type QueryBase = {
  _name?: string;
  boost?: number;
}

export type QueryContainer = {
  bool?: BoolQuery;
  boosting?: BoostingQuery;
  combined_fields?: CombinedFieldsQuery;
  common?: Record<string, CommonTermsQuery>;
  constant_score?: ConstantScoreQuery;
  dis_max?: DisMaxQuery;
  distance_feature?: DistanceFeatureQuery;
  exists?: ExistsQuery;
  field_masking_span?: SpanFieldMaskingQuery;
  function_score?: FunctionScoreQuery;
  fuzzy?: Record<string, FuzzyQuery>;
  geo_bounding_box?: GeoBoundingBoxQuery;
  geo_distance?: GeoDistanceQuery;
  geo_polygon?: GeoPolygonQuery;
  geo_shape?: GeoShapeQuery;
  has_child?: HasChildQuery;
  has_parent?: HasParentQuery;
  ids?: IdsQuery;
  intervals?: Record<string, IntervalsQuery>;
  knn?: KnnQuery;
  match?: Record<string, MatchQuery | any>;
  match_all?: MatchAllQuery;
  match_bool_prefix?: Record<string, MatchBoolPrefixQuery>;
  match_none?: MatchNoneQuery;
  match_phrase?: Record<string, MatchPhraseQuery>;
  match_phrase_prefix?: Record<string, MatchPhrasePrefixQuery>;
  more_like_this?: MoreLikeThisQuery;
  multi_match?: MultiMatchQuery;
  nested?: NestedQuery;
  neural?: NeuralQuery;
  parent_id?: ParentIdQuery;
  percolate?: PercolateQuery;
  pinned?: PinnedQuery;
  prefix?: Record<string, PrefixQuery>;
  query_string?: QueryStringQuery;
  range?: Record<string, RangeQuery>;
  rank_feature?: RankFeatureQuery;
  regexp?: Record<string, RegexpQuery>;
  rule_query?: RuleQuery;
  script?: ScriptQuery;
  script_score?: ScriptScoreQuery;
  simple_query_string?: SimpleQueryStringQuery;
  span_containing?: SpanContainingQuery;
  span_first?: SpanFirstQuery;
  span_multi?: SpanMultiTermQuery;
  span_near?: SpanNearQuery;
  span_not?: SpanNotQuery;
  span_or?: SpanOrQuery;
  span_term?: Record<string, SpanTermQuery>;
  span_within?: SpanWithinQuery;
  term?: Record<string, TermQuery | Common.FieldValue>;
  terms?: TermsQueryField;
  terms_set?: Record<string, TermsSetQuery>;
  text_expansion?: Record<string, TextExpansionQuery>;
  type?: TypeQuery;
  weighted_tokens?: Record<string, WeightedTokensQuery>;
  wildcard?: Record<string, WildcardQuery>;
  wrapper?: WrapperQuery;
  xy_shape?: XyShapeQuery;
}

export type QueryStringQuery = QueryBase & {
  allow_leading_wildcard?: boolean;
  analyze_wildcard?: boolean;
  analyzer?: string;
  auto_generate_synonyms_phrase_query?: boolean;
  default_field?: Common.Field;
  default_operator?: Operator;
  enable_position_increments?: boolean;
  escape?: boolean;
  fields?: Common.Field[];
  fuzziness?: Common.Fuzziness;
  fuzzy_max_expansions?: number;
  fuzzy_prefix_length?: number;
  fuzzy_rewrite?: Common.MultiTermQueryRewrite;
  fuzzy_transpositions?: boolean;
  lenient?: boolean;
  max_determinized_states?: number;
  minimum_should_match?: Common.MinimumShouldMatch;
  phrase_slop?: number;
  query: string;
  quote_analyzer?: string;
  quote_field_suffix?: string;
  rewrite?: Common.MultiTermQueryRewrite;
  tie_breaker?: number;
  time_zone?: Common.TimeZone;
  type?: TextQueryType;
}

export type RandomScoreFunction = {
  field?: Common.Field;
  seed?: number | string;
}

export type RangeQuery = DateRangeQuery | NumberRangeQuery

export type RangeQueryBase = QueryBase & {
  relation?: RangeRelation;
}

export type RangeRelation = 'contains' | 'intersects' | 'within'

export type RankFeatureFunction = Record<string, any>

export type RankFeatureFunctionLinear = RankFeatureFunction & Record<string, any>

export type RankFeatureFunctionLogarithm = RankFeatureFunction & {
  scaling_factor: number;
}

export type RankFeatureFunctionSaturation = RankFeatureFunction & {
  pivot?: number;
}

export type RankFeatureFunctionSigmoid = RankFeatureFunction & {
  exponent: number;
  pivot: number;
}

export type RankFeatureQuery = QueryBase & {
  field: Common.Field;
  linear?: RankFeatureFunctionLinear;
  log?: RankFeatureFunctionLogarithm;
  saturation?: RankFeatureFunctionSaturation;
  sigmoid?: RankFeatureFunctionSigmoid;
}

export type RegexpQuery = QueryBase & {
  case_insensitive?: boolean;
  flags?: string;
  max_determinized_states?: number;
  rewrite?: Common.MultiTermQueryRewrite;
  value: string;
}

export type RuleQuery = QueryBase & {
  match_criteria: Record<string, any>;
  organic: QueryContainer;
  ruleset_id: Common.Id;
}

export type ScriptQuery = QueryBase & {
  script: Common.Script;
}

export type ScriptScoreFunction = {
  script: Common.Script;
}

export type ScriptScoreQuery = QueryBase & {
  min_score?: number;
  query: QueryContainer;
  script: Common.Script;
}

export type SimpleQueryStringFlag = 'ALL' | 'AND' | 'ESCAPE' | 'FUZZY' | 'NEAR' | 'NONE' | 'NOT' | 'OR' | 'PHRASE' | 'PRECEDENCE' | 'PREFIX' | 'SLOP' | 'WHITESPACE'

export type SimpleQueryStringFlags = Common.PipeSeparatedFlagsSimpleQueryStringFlag

export type SimpleQueryStringQuery = QueryBase & {
  analyze_wildcard?: boolean;
  analyzer?: string;
  auto_generate_synonyms_phrase_query?: boolean;
  default_operator?: Operator;
  fields?: Common.Field[];
  flags?: SimpleQueryStringFlags;
  fuzzy_max_expansions?: number;
  fuzzy_prefix_length?: number;
  fuzzy_transpositions?: boolean;
  lenient?: boolean;
  minimum_should_match?: Common.MinimumShouldMatch;
  query: string;
  quote_field_suffix?: string;
}

export type SpanContainingQuery = QueryBase & {
  big: SpanQuery;
  little: SpanQuery;
}

export type SpanFieldMaskingQuery = QueryBase & {
  field: Common.Field;
  query: SpanQuery;
}

export type SpanFirstQuery = QueryBase & {
  end: number;
  match: SpanQuery;
}

export type SpanGapQuery = Record<string, number>

export type SpanMultiTermQuery = QueryBase & {
  match: QueryContainer;
}

export type SpanNearQuery = QueryBase & {
  clauses: SpanQuery[];
  in_order?: boolean;
  slop?: number;
}

export type SpanNotQuery = QueryBase & {
  dist?: number;
  exclude: SpanQuery;
  include: SpanQuery;
  post?: number;
  pre?: number;
}

export type SpanOrQuery = QueryBase & {
  clauses: SpanQuery[];
}

export type SpanQuery = {
  field_masking_span?: SpanFieldMaskingQuery;
  span_containing?: SpanContainingQuery;
  span_first?: SpanFirstQuery;
  span_gap?: SpanGapQuery;
  span_multi?: SpanMultiTermQuery;
  span_near?: SpanNearQuery;
  span_not?: SpanNotQuery;
  span_or?: SpanOrQuery;
  span_term?: Record<string, SpanTermQuery>;
  span_within?: SpanWithinQuery;
}

export type SpanTermQuery = QueryBase & {
  value: string;
}

export type SpanWithinQuery = QueryBase & {
  big: SpanQuery;
  little: SpanQuery;
}

export type TermQuery = QueryBase & {
  case_insensitive?: boolean;
  value: Common.FieldValue;
}

export type TermsLookupField = {
  id?: Common.Id;
  index?: Common.IndexName;
  path?: Common.Field;
  routing?: Common.Routing;
}

export type TermsQueryField = {
  boost?: number;
  [key: string]: any | TermsLookupField | string[];
}

export type TermsSetQuery = QueryBase & {
  minimum_should_match_field?: Common.Field;
  minimum_should_match_script?: Common.Script;
  terms: string[];
}

export type TextExpansionQuery = QueryBase & {
  model_id: string;
  model_text: string;
  pruning_config?: TokenPruningConfig;
}

export type TextQueryType = 'best_fields' | 'bool_prefix' | 'cross_fields' | 'most_fields' | 'phrase' | 'phrase_prefix'

export type TokenPruningConfig = {
  only_score_pruned_tokens?: boolean;
  tokens_freq_ratio_threshold?: number;
  tokens_weight_threshold?: number;
}

export type TypeQuery = QueryBase & {
  value: string;
}

export type WeightedTokensQuery = QueryBase & {
  pruning_config?: TokenPruningConfig;
  tokens: Record<string, number>;
}

export type WildcardQuery = QueryBase & {
  case_insensitive?: boolean;
  rewrite?: Common.MultiTermQueryRewrite;
  value?: string;
  wildcard?: string;
}

export type WrapperQuery = QueryBase & {
  query: string;
}

export type XyShape = {
  coordinates?: any[];
  type?: string;
}

export type XyShapeField = {
  relation?: Common.GeoShapeRelation;
  shape: XyShape;
}

export type XyShapeQuery = QueryBase & Record<string, XyShapeField>

export type ZeroTermsQuery = 'all' | 'none'


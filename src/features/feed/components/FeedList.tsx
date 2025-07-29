import React, { useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useApplauseStore } from "../../../stores/applauseStore";
import { ApplausePost, Mission } from "../../../types";
import { FeedItem } from "./FeedItem";
import { MissionCarousel } from "./MissionCarousel";

type FeedItemType =
  | { type: "post"; data: ApplausePost }
  | { type: "missions"; data: Mission[] };

export const FeedList: React.FC = () => {
  const {
    posts,
    feedLoading,
    feedError,
    hasNextPage,
    loadFeed,
    loadMoreFeed,
    missions,
    loadMissions,
  } = useApplauseStore();

  const feedData = useMemo<FeedItemType[]>(() => {
    const items: FeedItemType[] = [];

    const firstHalf = posts.slice(0, Math.ceil(posts.length / 10));
    firstHalf.forEach((post) => {
      items.push({ type: "post", data: post });
    });

    if (posts.length > 0 && missions.length > 0) {
      items.push({ type: "missions", data: missions });
    }

    const secondHalf = posts.slice(Math.ceil(posts.length / 2));
    secondHalf.forEach((post) => {
      items.push({ type: "post", data: post });
    });

    return items;
  }, [posts, missions]);

  useEffect(() => {
    if (posts.length === 0) {
      loadFeed(true);
    }
    if (missions.length === 0) {
      loadMissions();
    }
  }, [posts.length, missions.length, loadFeed, loadMissions]);

  const handleRefresh = useCallback(() => {
    loadFeed(true);
  }, [loadFeed]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !feedLoading) {
      loadMoreFeed();
    }
  }, [hasNextPage, feedLoading, loadMoreFeed]);

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItemType; index: number }) => {
      if (item.type === "missions") {
        return <MissionCarousel missions={item.data} />;
      }

      const postItems = feedData.filter((feedItem) => feedItem.type === "post");
      const postIndex = postItems.findIndex(
        (postItem) =>
          postItem.type === "post" && postItem.data.id === item.data.id
      );

      return (
        <FeedItem
          post={item.data}
          isFirst={postIndex === 0}
          isLast={postIndex === postItems.length - 1}
        />
      );
    },
    [feedData]
  );

  const renderFooter = useCallback(() => {
    if (!feedLoading || posts.length === 0) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando mais...</Text>
      </View>
    );
  }, [feedLoading, posts.length]);

  const renderEmpty = useCallback(() => {
    if (feedLoading && posts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.emptyText}>Carregando feed...</Text>
        </View>
      );
    }

    if (feedError) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>Erro ao carregar feed</Text>
          <Text style={styles.errorSubtext}>{feedError}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum aplauso ainda</Text>
        <Text style={styles.emptySubtext}>
          Seja o primeiro a enviar um reconhecimento!
        </Text>
      </View>
    );
  }, [feedLoading, feedError, posts.length]);

  const keyExtractor = useCallback((item: FeedItemType, index: number) => {
    if (item.type === "missions") {
      return `missions-${index}`;
    }
    return item.data.id;
  }, []);

  const renderHeader = useCallback(() => {
    return null;
  }, []);

  return (
    <FlatList
      data={feedData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={feedLoading && posts.length > 0}
          onRefresh={handleRefresh}
        />
      }
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={[
        styles.container,
        posts.length === 0 && styles.emptyContainerStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    zIndex: 10,
  },
  container: {
    paddingTop: 260,
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 8,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF3B30",
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 8,
    textAlign: "center",
  },
  loadingFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#8E8E93",
  },
});


class MinPriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(element, priority) {
        this.values.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(n, m, edges,start, end) {
    const arr = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) {
        const [a, b] = edges[i];
        arr[a].push(b);
    }

    const path = Array(n + 1).fill(0);
    const dis = Array(n + 1).fill(Infinity);
    dis[start] = 0;
    for (let i = 1; i <= n; i++) {
        path[i] = i;
    }

    const pq = new MinPriorityQueue();
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { element: node } = pq.dequeue();

        for (const it of arr[node]) {
            if (dis[node] + 1 < dis[it]) {
                dis[it] = dis[node] + 1;
                path[it] = node;
                pq.enqueue(it, dis[it]);
            }
        }
    }

    const ans = [];
    if (dis[end] === Infinity) {
        return ["IMPOSSIBLE","IMPOSSIBLE"];
    } else {
        let node = end;
        while (path[node] !== node) {
            ans.push(Number(node));
            node = path[node];
        }
        ans.push(start);

        ans.reverse();
        return [ans.length, ans];
    }
}

// const edges = [[1,2],[2,3],[2,4],[3,4]];

// console.log(dijkstra(4, 4, edges,3,1));

export default dijkstra;

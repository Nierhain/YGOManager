import { z } from 'zod'
import axios from 'axios'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc'
import { Prisma } from '@prisma/client'
import { Card } from '~/server/db'
const { Decimal } = Prisma
export const cardRouter = createTRPCRouter({
    cards: publicProcedure.query(({ ctx }) => {
        return ctx.db.card.findMany()
    }),
    updateDb: protectedProcedure.mutation(async ({ ctx }) => {
        const cards = await queryApi()
        const dbCards = cards.map(mapCard)
        ctx.db.card.createMany({ data: dbCards })
    }),
    updatePrices: protectedProcedure.mutation(async ({ ctx }) => {
        const cards = await queryApi()
        const dbCards = await ctx.db.card.findMany({
            include: { prices: true, sets: true },
        })

        cards.forEach((x) => {
            let card = dbCards.find((c) => c.passcode === x.id)
            if (!card || !x.card_prices[0]) {
                return
            }
            card.prices.push(mapPrices(x.card_prices[0], card.id))
        })
    }),
    updateSetss: protectedProcedure.mutation(async ({ ctx }) => {}),
    getSecretMessage: protectedProcedure.query(() => {
        return 'you can now see this secret message!'
    }),
})

async function queryApi() {
    return await axios
        .get<{
            data: ApiResponse[]
        }>('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        .then((res) => res.data.data)
}

async function queryDbVersion() {
    const version = await axios
        .get<ApiVersion[]>('https://db.ygoprodeck.com/api/v7/checkDBVer.php')
        .then((res) => res.data)
    if (!version[0]) return null
    return { ...version[0] }
}

function isNewDbVersion(dbVersion: string, apiVersion: string) {
    return dbVersion.localeCompare(apiVersion) === -1
}

type ApiVersion = {
    database_version: string
    last_update: string
}

function mapCard(card: ApiResponse): Card {
    const id = createId()
    return {
        id: id,
        atk: card.atk,
        attribute: card.attribute,
        def: card.def,
        desc: card.desc,
        frameType: card.frameType,
        level: card.level,
        name: card.name,
        passcode: card.id,
        race: card.race,
        type: card.type,
        banOcg: card.banlist_info?.ban_ocg ?? 'unlimited',
        banTcg: card.banlist_info?.ban_tcg ?? 'unlimited',
        archetype: card.archetype,
        linkmarkers: card.linkmarkers?.join(';') ?? 'none',
        linkval: card.linkval ?? 0,
        scale: card.scale ?? 0,
        prices: card.card_prices.map((x) => mapPrices(x, id)),
        images: card.card_images.map((x) => mapImages(x, id)),
        sets: card.card_sets.map((x) => mapSets(x, id)),
    }
}
function mapSets(sets: ApiSets, id: string) {
    return {
        cardId: id,
        id: createId(),
        setCode: sets.set_code,
        setName: sets.set_name,
        setPrice: new Decimal(sets.set_price),
        setRarity: sets.set_rarity,
        setRarityCode: sets.set_rarity_code,
    }
}
function mapImages(images: ApiImages, id: string) {
    return {
        cardId: id,
        id: createId(),
        imageUrl: images.image_url,
        imageUrlCropped: images.image_url_cropped,
        imageUrlSmall: images.image_url_small,
        passcode: images.id,
    }
}
function mapPrices(prices: ApiPrices, cardId: string) {
    return {
        cardId: cardId,
        id: createId(),
        timestamp: dayjs().toDate(),
        amazon: new Decimal(prices.amazon_price),
        cardmarket: new Decimal(prices.cardmarket_price),
        coolstuffinc: new Decimal(prices.coolstuffinc_price),
        ebay: new Decimal(prices.ebay_price),
        tcgplayer: new Decimal(prices.tcgplayer_price),
    }
}

type ApiResponse = {
    id: number
    name: string
    type: string
    frameType: string
    pend_desc?: string
    monster_desc?: string
    scale?: number
    desc: string
    atk: number
    def: number
    level: number
    race: string
    attribute: string
    archetype: string
    ygoprodeck_url: string
    linkval?: number
    banlist_info?: { ban_tcg: string; ban_ocg: string; ban_goat: string }
    linkmarkers?: string[]
    card_images: ApiImages[]
    card_prices: ApiPrices[]
    card_sets: ApiSets[]
}

type ApiSets = {
    set_name: string
    set_code: string
    set_rarity: string
    set_rarity_code: string
    set_price: string
}

type ApiImages = {
    id: number
    image_url: string
    image_url_small: string
    image_url_cropped: string
}

type ApiPrices = {
    cardmarket_price: string
    tcgplayer_price: string
    ebay_price: string
    amazon_price: string
    coolstuffinc_price: string
}
